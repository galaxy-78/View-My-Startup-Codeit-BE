export class CompanyData {
	constructor(client) {
		this.data = client.Company; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
	count = async () => {
		const count = await this.data.count();

		return count;
	};

	findMany = async () => {
		const companies = await this.data.findMany();

		return companies;
	};

	findById = async () => {
		const company = await this.data.findById();

		return company;
	};

	create = async () => {
		const company = await this.data.create();

		return company;
	};

	update = async () => {
		const company = await this.data.update();

		return company;
	};

	delete = async () => {
		const company = await this.data.delete();

		return company;
	};
}
