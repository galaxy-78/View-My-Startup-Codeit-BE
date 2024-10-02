export class CompanyData {
	constructor(client) {
		this.client = client; // 이 부분에 각 모델(스키마)를 연결합니다.
	}

	// 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
	// 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.

	// 모든 기업 리스트 검색
	findAll = async ({ keyword, page, pageSize, orderBy }) => {
		const skip = (page - 1) * pageSize;
		const order = orderBy === 'recent' ? { createdAt: 'desc' } : { name: 'asc' };

		return await this.client.company.findMany({
			where: {
				name: { contains: keyword, mode: 'insensitive' },
			},
			orderBy: order,
			skip: skip,
			take: pageSize,
		});
	};

	// 기업 수 계산
	count = async ({ keyword }) => {
		return await this.client.company.count({
			where: {
				name: { contains: keyword, mode: 'insensitive' },
			},
		});
	};

	// 기업 ID로 기업 정보 가져오기
	findById = async id => {
		return await this.client.company.findUnique({
			where: { id },
		});
	};

	// 내 기업 선택
	selectMyCompany = async (companyId, userId) => {
		const company = await this.client.company.findUnique({
			where: { id: companyId },
		});
		if (!company) throw new Error('해당 기업을 찾을 수 없습니다.');

		await this.client.comparison.create({
			data: {
				userId,
				companyId: company.id,
			},
		});

		return company;
	};

	// 비교할 기업 선택
	selectCompareCompanies = async (selectedCompanyIds, userId) => {
		if (selectedCompanyIds.length > 5) {
			throw new Error('비교할 기업은 최대 5개까지 선택 가능합니다.');
		}

		const selectedCompanies = await Promise.all(
			selectedCompanyIds.map(companyId => this.client.company.findUnique({ where: { id: companyId } })),
		);

		for (const company of selectedCompanies) {
			await this.client.comparison.create({
				data: {
					userId,
					companyId: company.id,
				},
			});
		}

		return selectedCompanies;
	};
}
