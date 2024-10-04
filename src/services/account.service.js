import encrypt, { generateRandomHexString, ITER_SSN_FULL } from "../utils/encrypt.js";
import { prismaClient as prisma } from '../connection/postgres.connection.js';

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

	updateUserIterAndCreateSession = async ({ email, id, nickname }) => {
		salt = generateRandomHexString();
		sessionPwd = generateRandomHexString();
		const [user, userSession] = prisma.$transaction([
			await this.data.update0({
				where: { email },
				data: {
					iter: {
						decrement: 1,
					}
				}
			}),
			await this.data.create({
				data: {
					userId: id,
					sessionSalt: salt,
					sessionEncrypted: encrypt(salt, sessionPwd, ITER_SSN_FULL),
				}
			})
		]);

		return { userUuid: id, nickname, sessionPwd, createdAt: userSession.createdAt };
	};

	checkAvailability = async ({ email, nickname }) => {
		const result = { email: false, nickname: false };
		const user0 = this.data.findUnique0({
			where: { email },
		});
		if (!user0) {
			result.email = true;
		}
		const user1 = this.data.findUnique0({
			where: { nickname },
		});
		if (!user1) {
			result.nickname = true;
		}
		return result;
	};

	createUserAndCreateSession = async (data) => {
		if (data.pwdCfm !== 'confirmed') {
			throw new Error('Password is not confirmed.');
		}
		delete data.pwdCfm;
		const user = await this.data.create0({
				data,
			});
		salt = generateRandomHexString();
		sessionPwd = generateRandomHexString();
		const userSession = await this.data.create({
				data: {
					userId: user.id,
					sessionSalt: salt,
					sessionEncrypted: encrypt(salt, sessionPwd, ITER_SSN_FULL),
				}
			});

		return { userUuid: user.id, nickname: user.nickname, sessionPwd, createdAt: userSession.createdAt };
	};

	getUsers = async () => {
		const users = await this.data.findMany0();

		return users;
	};

	postPwdIter = async ({ email }) => {
		const account = await this.data.findUniqueOrThrow0({
			where: { email },
			select: {
				iter: true,
				salt: true,
			},
		});

		return account;
	};

	postSsnIter = async ({ id, createdAt }) => {
		const account = await this.data.findUniqueOrThrow({
			where: { id, createdAt },
			select: {
				iter: true,
				salt: true,
			}
		})
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
