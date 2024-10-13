import { assert } from 'superstruct';
import encrypt, { encryptRest, generateRandomHexString, ITER_SSN_FULL } from '../utils/encrypt.js';
import { loginBody, loginWithGoogleBody, preGoogleBody, signupBody } from '../../prisma/structs.js';

const getClientIp = (req) => {
	return req.headers['x-forwarded-for']?.split(/,\s/)[0] || req.socket.remoteAddress?.split(/,\s/)[0];
}

export class AuthController {
	constructor(userService, userSessionService, socialLoginService) {
		this.userService = userService;
		this.userSessionService = userSessionService;
		this.socialLoginService = socialLoginService; // 이 부분에서 service에 연결합니다.
	}

	// 여기서 api로써 통신합니다.
	// 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
	// 주로 받아온 요청의 유효성을 검사합니다.
	// 따라서 superstruct나 validation 관련 코드는 여기에 많이 작성됩니다.
	// validation은 위쪽 router에서도 사용되고는 하는데, 이에 대해서는 그쪽에 주석 남기겠습니다.
	// 응답의 status를 지정하고, body를 전달합니다.

	postPreGoogle = async (req, res) => {
		assert(req.body, preGoogleBody);
		const ip = getClientIp(req);
		const { sW, sH, state } = req.body;
		const socialLogin = await this.socialLoginService.postPreGoogle({
			sW,
			sH,
			state,
			ip,
		});
		return res.json({ result: !!socialLogin });
	}

	postLoginWithGoogle = async (req, res) => {
		assert(req.body, loginWithGoogleBody);
		const { sW, sH, state, email } = req.body;
		const ip = getClientIp(req);
		const checkPassed = await this.socialLoginService.checkAccountGoogle({
			sW,
			sH,
			state,
			ip,
		});
		if (checkPassed) {
			const user = await this.userService.getUserByEmail(email);
			const ssnResponse = await this.#createSession(user, ip);
			res.json(ssnResponse);
		} else {
			res.json({ message: 'Google 을 통한 로그인에 실패했습니다.' })
		}
	}

	postSignup = async (req, res) => {
		assert(req.body, signupBody);
		const { email, name, nickname, salt, pwdEncrypted } = req.body;
		const user = await this.userService.create({ email, name, nickname, salt, pwdEncrypted });
		const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		const ssnResponse = await this.#createSession(user, ip);
		res.json(ssnResponse);
	};

	// (req, res) 로 받아야 하는거 같아서 바꿨습니다.
	postLogin = async (req, res) => {
		assert(req.body, loginBody);
		const { email, pwdEncrypted } = req.body;
		const user = await this.userService.getUserByEmail(email);

		if (encryptRest(user.salt, pwdEncrypted, user.iter) === user.pwdEncrypted) {
			const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
			const user = await this.userService.updateUserIterByEmail(email);
			const ssnResponse = await this.#createSession(user, ip);
			res.json(ssnResponse);
		}
	};

	// sessionSalt 와 sessionPwd 에 random hex string (length: 32) 를 넣어줍니다.
	// Client 는 sessionPwd 만 안전하게 보관하면 됩니다. (자신의 id 와 createdAt 과 함께.)
	#createSession = async ({ id, nickname }, ip) => {
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
