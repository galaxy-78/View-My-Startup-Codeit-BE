import { assert } from "superstruct";
import { postCheckBody, postSsnIterBody } from "../../prisma/structs.js";
import { encryptRest } from "../utils/encrypt.js";

export class AccountController {
	constructor(accountService) {
		this.service = accountService; // 이 부분에서 service에 연결합니다.
	}

	// 여기서 api로써 통신합니다.
	// 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
	// 주로 받아온 요청의 유효성을 검사합니다.
	// 따라서 superstruct나 validation 관련 코드는 여기에 많이 작성됩니다.
	// validation은 위쪽 router에서도 사용되고는 하는데, 이에 대해서는 그쪽에 주석 남기겠습니다.
	// 응답의 status를 지정하고, body를 전달합니다.
	postLogin = async (req, res) => {
		const { email, pwdEncrypted } = req.body;
		const user = await this.service.getUser({ email });

		if (encryptRest(user.salt, pwdEncrypted, user.iter) === user.pwdEncrypted) {
			const session = await this.service.updateUserIterAndCreateSession(user);
			res.json(session);
		}
	};

	postLogout = async (req, res) => {
		const { userId, createdAt, sessionEncrypted } = req.body;
		const result = await this.service.postLogoutAndDeleteSession({ userId, createdAt, sessionEncrypted });
		res.json(result);
	}

	postCheck = async (req, res) => {
		assert(req.body, postCheckBody);
		const { email, nickname } = req.body;
		const available = await this.service.checkAvailability({ email, nickname });
		res.json(available);
	};

	postSignup = async (req, res) => {
		const { email, name, nickname, salt, pwdEncrypted } = req.body;
		const session = await this.service.createUserAndCreateSession({ email, name, nickname, salt, pwdEncrypted });
		res.json(session);
	};

	getUsers = async (req, res) => {
		const users = await this.service.getUsers();

		res.json(users);
	};

	postPwdIter = async (req, res) => {
		const { email } = req.body;
		const account = await this.service.postPwdIter({ email });

		res.json(account);
	};

	postSsnIter = async (req, res) => {
		assert(req.body, postSsnIterBody);
		const { userId, createdAt } = req.body;
		const account = await this.service.postSsnIter({ userId, createdAt });
		res.json(account);
	};
}
