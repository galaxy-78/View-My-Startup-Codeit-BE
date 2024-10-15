import { assert } from 'superstruct';
import querystring from 'querystring';
import encrypt, { encryptRest, generateRandomHexString, ITER_SSN_FULL } from '../utils/encrypt.js';
import { loginBody, loginWithSocialBody, preSocialLoginBody, signupBody } from '../../prisma/structs.js';
import axios from 'axios';

const getClientIp = (req) => {
	return req.headers['x-forwarded-for']?.split(/,\s/)[0].trim() || req.socket.remoteAddress?.split(/,\s/)[0].trim();
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

	postPreSocial = async (req, res) => {
		assert(req.body, preSocialLoginBody);
		const ip = getClientIp(req);
		const { sW, sH, state, authorizor, nickname } = req.body;
		const socialLogin = await this.socialLoginService.postPreSocial({
			sW,
			sH,
			state,
			ip,
			authorizor,
			nickname,
		});
		return res.json({ result: !!socialLogin });
	}

	postLoginWithSocial = async (req, res) => {
		assert(req.body, loginWithSocialBody);
		const { sW, sH, state, email, authorizor } = req.body;
		const ip = getClientIp(req);
		const checkPassed = await this.socialLoginService.checkAccountSocial({
			sW,
			sH,
			state,
			ip,
			authorizor,
		});
		if (checkPassed) {
			const socialLoginData = await this.socialLoginService.findSocialLogin(state, ip);
			if (email.trim()) {
				const user = await this.userService.getUserByEmail(email);
				if (!user?.id) {
					if (!socialLoginData.nickname.trim()) {
						return res.json({ message: `해당 계정 (Email: ${email}) 이 존재하지 않습니다.` });
					}
					const checkAvailability = await this.userService.checkAvailability({ email, nickname: socialLoginData.nickname });
					if (!(checkAvailability.email && checkAvailability.nickname)) {
						return res.json({ message: `Email (${email}) 사용 가능: ${checkAvailability.email}\n닉네임 사용 가능: ${checkAvailability.nickname}` });
					}
					const user = await this.userService.create({ email, name: 'Unknown', nickname: socialLoginData.nickname, salt: generateRandomHexString(), pwdEncrypted: generateRandomHexString(104) });
					const ssnResponse = await this.#createSession(user, ip);
					return res.json(ssnResponse);
				}
				const ssnResponse = await this.#createSession(user, ip);
				return res.json(ssnResponse);
			} else if (authorizor.trim() === 'kakao') {
				const { code } = req.body;
				const data = {
					grant_type: 'authorization_code',
					client_id: process.env.KAKAO_CLIENT_ID,
					redirect_uri: process.env.KAKAO_REDIRECT_URI,
					code,
					client_secret: process.env.KAKAO_CLIENT_SECRET,
				};
				axios.post(`https://kauth.kakao.com/oauth/token`, querystring.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					}
				})
				.then(async resp => {
					const { access_token } = resp.data;
					const resp1 = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
						params: {
							secure_resource: false,
							// property_keys: ['kakao_account.email'],
						},
						headers: {
							'Authorization': `Bearer ${access_token}`,
						}});
					const email1 = resp1.data.kakao_account.email.trim();
					if (email1) {
						const user = await this.userService.getUserByEmail(email1);
						if (!user?.id) {
							if (!socialLoginData.nickname.trim()) {
								return res.json({ message: `해당 계정 (Email: ${email1}) 이 존재하지 않습니다.` });
							}
							const checkAvailability = await this.userService.checkAvailability({ email: email1, nickname: socialLoginData.nickname });
							if (!(checkAvailability.email && checkAvailability.nickname)) {
								return res.json({ message: `Email (${email1}) 사용 가능: ${checkAvailability.email}\n닉네임 사용 가능: ${checkAvailability.nickname}` });
							}
							const user = await this.userService.create({ email: email1.trim(), name: 'Unknown', nickname: socialLoginData.nickname.trim(), salt: generateRandomHexString(), pwdEncrypted: generateRandomHexString(104) });
							const ssnResponse = await this.#createSession(user, ip);
							return res.json(ssnResponse);
						}
						const ssnResponse = await this.#createSession(user, ip);
						return res.json(ssnResponse);
					}
					return res.json({ message: '카카오 계정에서 Email 을 찾을 수 없습니다.' });
				})
				.catch(err => {
					console.error('Error: ', err.response ? err.response.data : err.message);
					return res.json(err);
				});
			}
		} else {
			return res.json({ message: 'Social 로그인에 실패했습니다.' })
		}
	}

	postSignup = async (req, res) => {
		assert(req.body, signupBody);
		const { email, name, nickname, salt, pwdEncrypted } = req.body;
		const user = await this.userService.create({ email, name, nickname, salt, pwdEncrypted });
		const ip = getClientIp(req);
		const ssnResponse = await this.#createSession(user, ip);
		res.json(ssnResponse);
	};

	// (req, res) 로 받아야 하는거 같아서 바꿨습니다.
	postLogin = async (req, res) => {
		assert(req.body, loginBody);
		const { email, pwdEncrypted } = req.body;
		const user = await this.userService.getUserByEmail(email);
		if (!user?.id) {
			return res.json({ message: `해당 계정 (Email: ${email}) 이 존재하지 않습니다.` });
		}
		if (encryptRest(user.salt, pwdEncrypted, user.iter) === user.pwdEncrypted) {
			const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
			const user = await this.userService.updateUserIterByEmail(email);
			const ssnResponse = await this.#createSession(user, ip);
			return res.json(ssnResponse);
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
		if (userSession?.userId) {
			return { userUuid: id, nickname, sessionPwd, createdAt: userSession.createdAt };
		}
		return { message: 'Session 이 제대로 생성되지 못했습니다.' };
	};
}
