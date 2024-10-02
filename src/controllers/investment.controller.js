import { assert } from 'superstruct';
import { patchInvestment, Uuid } from '../../prisma/structs.js';
import c from '../utils/constants.js';

export class InvestmentController {
	constructor(investmentService) {
		this.service = investmentService; // 이 부분에서 service에 연결합니다.
	}

	// 여기서 api로써 통신합니다.
	// 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
	// 주로 받아온 요청의 유효성을 검사합니다.
	// 따라서 superstruct나 validation 관련 코드는 여기에 많이 작성됩니다.
	// validation은 위쪽 router에서도 사용되고는 하는데, 이에 대해서는 그쪽에 주석 남기겠습니다.
	// 응답의 status를 지정하고, body를 전달합니다.
	getInvestments = async (req, res) => {
		// TODO need validation
		// TODO need pagination
		const investments = await this.service.getInvestments({ size: 10 });

		res.json(investments);
	};

	patchInvestment = async (req, res) => {
		const id = req.params.id;
		// NOTE 인자 형식 유효성 검사
		assert(id, Uuid, c.MESSAGES.IDFORMAT);
		assert(req.body, patchInvestment);

		// NOTE password 인증 실패시 401 에러
		const isCertified = await this.service.certify(id, req.body.password);
		if (!isCertified) {
			res.status(401).json({ message: c.MESSAGES.UNAUTHORIZED });
			return null;
		}

		const investment = await this.service.patch(id, req.body);

		if (!investment) {
			res.status(404).json({ message: c.MESSAGES.NOID });
			return null;
		}

		res.json(investment);
	};
}
