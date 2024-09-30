export class CompanyService {
	constructor(companyData) {
		this.data = companyData; // 이 부분에 data.js를 연결합니다.
	}

	// 이 아래로 데이터를 가공하는 코드를 작성합니다.
	// 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
	// 여기서 가공된 데이터를 controller로 올려줍니다.
	getCompanies = async ({ parameter }) => {
		const totalCount = await this.data.count();
		const list = await this.data.findMany();

		return { list, totalCount };
	};

	getCompany = async ({ parameter }) => {
		const company = await this.data.findById();

		return company;
	};

	postCompany = async ({ parameter }) => {
		const company = await this.data.create();

		return company;
	};

	updateCompany = async ({ parameter }) => {
		const company = await this.data.update();

		return company;
	};

	deleteCompany = async ({ parameter }) => {
		const company = await this.data.delete();

		return company;
	};
}
