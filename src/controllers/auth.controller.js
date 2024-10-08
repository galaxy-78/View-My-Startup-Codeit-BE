import { assert } from 'superstruct';
import encrypt, { encryptRest, generateRandomHexString, ITER_SSN_FULL } from '../utils/encrypt.js';
import { loginBody } from '../../prisma/structs.js';

export class AuthController {
	constructor(userService, userSessionService) {
		this.userService = userService;
		this.userSessionService = userSessionService;
	}

	// (req, res) 로 받아야 하는거 같아서 바꿨습니다.
	postLogin = async (req, res) => {
		assert(req.body, loginBody);
		const { email, pwdEncrypted } = req.body;
		const user = await this.userService.getUserByEmail(email);

		if (encryptRest(user.salt, pwdEncrypted, user.iter) === user.pwdEncrypted) {
			const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
			const user = await this.userService.updateUserIterByEmail(email);
			const ssnResponse = await this.createSession(user, ip);
			res.json(ssnResponse);
		}
	};

	// sessionSalt 와 sessionPwd 에 random hex string (length: 32) 를 넣어줍니다.
	// Client 는 sessionPwd 만 안전하게 보관하면 됩니다. (자신의 id 와 createdAt 과 함께.)
	createSession = async ({ id, nickname }, ip) => {
		const salt = generateRandomHexString();
		const sessionPwd = generateRandomHexString();
		const userSession = await this.userSessionService.createSession({
			userId: id,
			iter: ITER_SSN_FULL - 1,
			ip: ip.substring(0, 45),
			sessionSalt: salt,
			sessionEncrypted: encrypt(salt, sessionPwd, ITER_SSN_FULL),
		});

		return { userUuid: id, nickname, sessionPwd, createdAt: userSession.createdAt };
	};
}
