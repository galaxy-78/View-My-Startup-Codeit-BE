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
		const orderBy = req.query.orderBy || 'bigger';
		const page = Number(req.query.page) || 1;
		const pageSize = Number(req.query.pageSize) || 5;

		const resBody = await this.service.getInvestments({ orderBy, page, pageSize });

		res.json(resBody);
	};

	// NOTE 전체 투자 금액 총계
	getTotalAmount = async (req, res) => {
		const total = await this.service.getTotalAmount();

		res.json(total);
	};

	patchInvestment = async (req, res) => {
		const id = req.params.id;
		console.log(id);
		assert(id, Uuid, c.MESSAGES.IDFORMAT);
		assert(req.body, patchInvestment);

		const investment = await this.service.patch(id, req.body);

		if (!investment) res.status(404).json({ message: c.MESSAGES.NOID });

		res.json(investment);
	};
}
