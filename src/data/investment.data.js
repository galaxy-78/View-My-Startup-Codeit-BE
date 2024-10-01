export class InvestmentData {
	constructor(client) {
		this.data = client.Investment; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
	count = async () => {
		const count = await this.data.count();

		return count;
	};

	findMany = async size => {
		const investments = await this.data.findMany({ take: size });

		return investments;
	};

	findById = async () => {
		const investment = await this.data.findById();

		return investment;
	};

	create = async () => {
		const investment = await this.data.create();

		return investment;
	};

	update = async (id, data) => {
		const investment = await this.data.update({ where: { id }, data });

		return investment;
	};

	delete = async () => {
		const investment = await this.data.delete();

		return investment;
	};
}
