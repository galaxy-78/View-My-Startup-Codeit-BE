export class InvestmentService {
	constructor(investmentData) {
		this.data = investmentData; // 이 부분에 data.js를 연결합니다.
	}

	// 이 아래로 데이터를 가공하는 코드를 작성합니다.
	// 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
	// 여기서 가공된 데이터를 controller로 올려줍니다.
	getInvestments = async ({ orderBy, page, pageSize, companyId }) => {
		const totalCount = await this.data.count(companyId);

		const list = await this.data.findMany(orderBy, page, pageSize, companyId);

		return { list, totalCount };
	};

	// NOTE 전체 투자 금액 총계
	getTotalAmount = async companyId => {
		const amounts = await this.data.findAmounts(companyId);

		const total = amounts.reduce((acc, cur) => {
			return BigInt(cur.amount) + BigInt(acc);
		}, 0);

		return total;
	};

	getInvestment = async id => {
		const investment = await this.data.findById(id);

		return investment;
	};

	post = async body => {
		const investment = await this.data.create(body);

		return investment;
	};

	patch = async (id, body) => {
		const investment = await this.data.update(id, body);

		return investment;
	};

	delete = async id => {
		const investment = await this.data.delete(id);

		return investment;
	};

	certify = async (id, input) => {
		// input이 undefined, null 등일때 false를 반환
		if (!input) return false;

		const investment = await this.data.findById(id);
		const password = investment.password;

		return input === password;
	};
}
