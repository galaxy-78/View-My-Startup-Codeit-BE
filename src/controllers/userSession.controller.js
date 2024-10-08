import { assert } from 'superstruct';
import { ssnBody } from '../../prisma/structs.js';

export class UserSessionController {
	constructor(userSessionService) {
		this.service = userSessionService; // 이 부분에서 service에 연결합니다.
	}

	// 여기서 api로써 통신합니다.
	// 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
	// 주로 받아온 요청의 유효성을 검사합니다.
	// 따라서 superstruct나 validation 관련 코드는 여기에 많이 작성됩니다.
	// validation은 위쪽 router에서도 사용되고는 하는데, 이에 대해서는 그쪽에 주석 남기겠습니다.
	// 응답의 status를 지정하고, body를 전달합니다.
	// NOTE 기능상 delete 요청으로 보이지만, router endpoint 작동에 영향을 줄 수 있어보여 메소드명은 고치지 않았습니다.
	// TODO 확인 후 메소드 명이 잘못되어있다면 고쳐주세요.
	postLogout = async (req, res) => {
		const { userId, createdAt, sessionEncrypted } = req.body;
		const result = await this.service.deleteSession({ userId, createdAt, sessionEncrypted });

		res.json(result);
	};

	// NOTE 기능상 get 요청으로 보이지만, router endpoint 작동에 영향을 줄 수 있어보여 메소드명은 고치지 않았습니다.
	// TODO 확인 후 메소드 명이 잘못되어있다면 고쳐주세요.
	postSsnIter = async (req, res) => {
		assert(req.cookies, ssnBody);
		const { userId, createdAt } = req.cookies;
		const session = await this.service.getSessionIter({ userId, createdAt });

		res.json(session);
	};
}
