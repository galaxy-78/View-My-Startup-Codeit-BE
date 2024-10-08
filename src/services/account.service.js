import encrypt, { encryptSSNRest, generateRandomHexString, ITER_SSN_FULL } from "../utils/encrypt.js";
import { prismaClient as prisma } from '../connection/postgres.connection.js';
import { ValidationError } from "../utils/error.js";

export class AccountService {
	constructor(accountData) {
		this.data = accountData; // 이 부분에 data.js를 연결합니다.
	}

	// 이 아래로 데이터를 가공하는 코드를 작성합니다.
	// 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
	// 여기서 가공된 데이터를 controller로 올려줍니다.
	getUser = async ({ email }) => {
		const user = await this.data.findUniqueOrThrow0({
			where: { email },
		});

		return user;
	};

	// updateUserIterAndCreateSession = async ({ email, id, nickname }, ip) => {
	// 	const salt = generateRandomHexString();
	// 	const sessionPwd = generateRandomHexString();
	// 	const user = await this.data.update0({
	// 			where: { email },
	// 			data: {
	// 				iter: {
	// 					decrement: 1,
	// 				},
	// 			},
	// 		});
	// 	const userSession = await this.data.create({
	// 			data: {
	// 				userId: id,
	// 				ip,
	// 				sessionSalt: salt,
	// 				iter: ITER_SSN_FULL - 1,
	// 				sessionEncrypted: encrypt(salt, sessionPwd, ITER_SSN_FULL),
	// 			},
	// 		});

	// 	return { userUuid: id, nickname, sessionPwd, createdAt: userSession.createdAt };
	// };

	postLogoutAndDeleteSession = async ({ userId, createdAt, sessionEncrypted }) => {
		const session = await this.data.findUniqueOrThrow({
			where: {
				userId_createdAt: {
					userId,
					createdAt,
				},
			},
		});
		if (session.sessionEncrypted === encryptSSNRest(session.sessionSalt, sessionEncrypted, session.iter)) {
			await this.data.delete({
				where: {
					userId_createdAt: {
						userId,
						createdAt,
					},
				},
			});
			return { message: 'Session 이 안전하게 지워졌습니다.' };
		}
		return { message: 'Session 이 유효하지 않아 server 상의 session 은 지워지지 않았습니다.' };
	};

	postLogoutAndDeleteAllSession = async ({ userId, createdAt, sessionEncrypted }) => {
		const session = await this.data.findUniqueOrThrow({
			where: {
				userId_createdAt: {
					userId,
					createdAt,
				},
			},
		});
		if (session.sessionEncrypted === encryptSSNRest(session.sessionSalt, sessionEncrypted, session.iter)) {
			await this.data.deleteMany({
				where: {
					userId,
				},
			});
			return { message: '모든 Session 들이 안전하게 지워졌습니다.' };
		}
		return { message: 'Session 이 유효하지 않아 server 상의 session 은 지워지지 않았습니다.' };
	};

	postSsns = async ({ userId, createdAt, sessionEncrypted }) => {
		const session = await this.data.findUniqueOrThrow({
			where: {
				userId_createdAt: {
					userId,
					createdAt,
				},
			},
		});
		if (session.sessionEncrypted === encryptSSNRest(session.sessionSalt, sessionEncrypted, session.iter)) {
			await this.data.update({
				where: {
					userId_createdAt: {
						userId,
						createdAt,
					},
				},
				data: {
					iter: {
						decrement: 1,
					},
				},
			});
			const sessions = this.data.findMany({
				where: {
					userId,
				},
				orderBy: {
					createdAt: 'desc',
				},
				select: {
					iter: true,
					ip: true,
					createdAt: true,
				},
			});
			return sessions;
		}
		throw new ValidationError({ message: 'Session 이 유효하지 않아 데이터를 불러오지 못했습니다.' });
	};

	checkAvailability = async ({ email, nickname }) => {
		const result = { email: false, nickname: false };
		const user0 = await this.data.findUnique0({
			where: { email },
		});
		if (!user0) {
			result.email = true;
		}
		const user1 = await this.data.findUnique0({
			where: { nickname },
		});
		if (!user1) {
			result.nickname = true;
		}
		return result;
	};

	createUserAndCreateSession = async (data, ip) => {
		const user = await this.data.create0({
				data,
			});
		const salt = generateRandomHexString();
		const sessionPwd = generateRandomHexString();
		const userSession = await this.data.create({
				data: {
					userId: user.id,
					ip,
					sessionSalt: salt,
					iter: ITER_SSN_FULL - 1,
					sessionEncrypted: encrypt(salt, sessionPwd, ITER_SSN_FULL),
				}
			});

		return { userUuid: user.id, nickname: user.nickname, sessionPwd, createdAt: userSession.createdAt };
	};

	// // TODO del this for security in production mode.
	// getUsers = async () => {
	// 	const users = await this.data.findMany0();

	// 	return users;
	// };

	// postPwdIter = async ({ email }) => {
	// 	const account = await this.data.findUniqueOrThrow0({
	// 		where: { email },
	// 		select: {
	// 			iter: true,
	// 			salt: true,
	// 		},
	// 	});

	// 	return account;
	// };

	postSsnIter = async ({ userId, createdAt }) => {
		const session = await this.data.findUniqueOrThrow({
			where: {
				userId_createdAt: {
					userId,
					createdAt,
				},
			},
			select: {
				iter: true,
				sessionSalt: true,
			},
		});

		return session;
	}

	postAccount = async ({ parameter }) => {
		const account = await this.data.create();

		return account;
	};

	updateAccount = async ({ parameter }) => {
		const account = await this.data.update();

		return account;
	};

	deleteAccount = async ({ parameter }) => {
		const account = await this.data.delete();

		return account;
	};
}
