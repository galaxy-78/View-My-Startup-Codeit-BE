import { encryptRest, encrypt, generateRandomHexString, ITER_SSN_FULL } from '../utils/encrypt.js';

export class AuthController {
	constructor(userService, userSessionService) {
		this.userService = userService;
		this.userSessionService = userSessionService;
	}

	postLogin = async ({ email, pwdEncrypted }) => {
		const user = await this.userService.getUser(email);

		if (encryptRest(user.salt, pwdEncrypted, user.iter) === user.pwdEncrypted) {
			const user = await this.userService.updateUserIter(email);
			const session = await this.createSession(user);

			res.json(session);
		}
	};

	createSession = async ({ id, nickname }) => {
		const salt = generateRandomHexString();
		const sessionPwd = generateRandomHexString();
		const userSession = await this.userSessionService.createSession({
			userId: id,
			sessionSalt: salt,
			iter: ITER_SSN_FULL - 1,
			sessionEncrypted: encrypt(salt, sessionPwd, ITER_SSN_FULL),
		});

		return { userUuid: id, nickname, sessionPwd, createdAt: userSession.createdAt };
	};
}
