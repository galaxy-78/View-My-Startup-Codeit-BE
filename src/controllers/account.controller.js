import { assert } from "superstruct";

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
			const session = this.service.updateUserIterAndCreateSession(user);
			res.json(session);
		}
	};

	postCheck = async (req, res) => {
		assert(postCheck, req.body);
		const { email, nickname } = req.body;
		const available = await this.service.checkAvailability({ email, nickname });
		res.json(available);
	};

	postSignup = async (req, res) => {
		const { email, nickname, salt, pwdEncrypted, pwdCfm } = req.body;
		const session = this.service.createUserAndCreateSession({ email, nickname, salt, pwdEncrypted, pwdCfm });
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
		const { id, createdAt } = req.body;
		const account = await this.service.postSsnIter({ id, createdAt });

		res.json(account);
	};
}
