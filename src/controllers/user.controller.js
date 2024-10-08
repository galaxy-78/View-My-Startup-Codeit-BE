import { assert } from 'superstruct';
import { Email, postCheckBody } from '../../prisma/structs.js';

export class UserController {
	constructor(userService) {
		this.service = userService; // 이 부분에서 service에 연결합니다.
	}

	// 여기서 api로써 통신합니다.
	// 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
	// 주로 받아온 요청의 유효성을 검사합니다.
	// 따라서 superstruct나 validation 관련 코드는 여기에 많이 작성됩니다.
	// validation은 위쪽 router에서도 사용되고는 하는데, 이에 대해서는 그쪽에 주석 남기겠습니다.
	// 응답의 status를 지정하고, body를 전달합니다.
	getUsers = async (req, res) => {
		const users = await this.service.getUsers();
		res.json(users);
	};

	postCheck = async (req, res) => {
		assert(req.body, postCheckBody);
		const { email, nickname } = req.body;
		const available = await this.service.checkAvailability({ email, nickname });

		res.json(available);
	};

	postSignup = async (req, res) => {
		const { email, name, nickname, salt, pwdEncrypted } = req.body;
		const user = await this.service.post({ email, name, nickname, salt, pwdEncrypted });

		res.json(user);
	};

	// NOTE 기능상 get 요청으로 보이지만, router endpoint 작동에 영향을 줄 수 있어보여 메소드명은 고치지 않았습니다.
	// data 를 query 형태로 보내면 get 으로 가능한데, post 가 보안상 더 좋은거 같아서 post 로 구현했습니다.
	postPwdIter = async (req, res) => {
		const { email } = req.body;
		assert(email, Email);
		const iterNSalt = await this.service.getPwdIter({ email });

		res.json(iterNSalt);
	};
}
