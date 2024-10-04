export class CompanyData {
	constructor(client) {
		this.data = client.Company; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.

	// 모든 기업 리스트 검색
	getCompanies = async ({ keyword, page, pageSize, orderBy }) => {
		const skip = (page - 1) * pageSize;
		const order = orderBy === 'recent' ? { createdAt: 'desc' } : { name: 'asc' };

		return await this.data.findMany({
			where: {
				name: { contains: keyword, mode: 'insensitive' },
			},
			orderBy: order,
			skip: skip,
			take: pageSize,
		});
	};

	// 기업 수 계산
	getCompanyCount = async ({ keyword }) => {
		return await this.data.count({
			where: {
				name: { contains: keyword, mode: 'insensitive' },
			},
		});
	};

	// 기업 ID로 기업 정보 가져오기
	getCompanyById = async id => {
		return await this.data.findUnique({
			where: { id },
		});
	};
}
