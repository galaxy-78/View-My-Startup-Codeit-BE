export class InvestmentService {
	constructor(investmentData) {
		this.data = investmentData; // 이 부분에 data.js를 연결합니다.
	}

	// 이 아래로 데이터를 가공하는 코드를 작성합니다.
	// 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
	// 여기서 가공된 데이터를 controller로 올려줍니다.
	getInvestments = async ({ size }) => {
		const totalCount = await this.data.count();
		const list = await this.data.findMany(size);

		return { list, totalCount };
	};

	getInvestment = async ({ parameter }) => {
		const investment = await this.data.findById();

		return investment;
	};

	postInvestment = async ({ parameter }) => {
		const investment = await this.data.create();

		return investment;
	};

	patch = async (id, body) => {
		const investment = await this.data.update(id, body);

		return investment;
	};

	deleteInvestment = async ({ parameter }) => {
		const investment = await this.data.delete();

		return investment;
	};
}
