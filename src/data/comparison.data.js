export class ComparisonData {
	constructor(client) {
		this.data = client.Comparison; // Comparison 모델을 연결합니다.
	}

	// 회사 ID로 회사 정보 가져오기
	findCompanyById = async companyId => {
		return await this.data.findUnique({
			where: { id: companyId }, // 유니크한 ID로 검색
		});
	};

	// 사용자 ID와 회사 ID로 비교 기업 추가
	createComparison = async (companyId, userId) => {
		return await this.data.create({
			data: {
				companyId,
				userId,
			},
		});
	};

	// 선택한 사용자의 비교 기업 목록 가져오기
	getCompareCompanies = async userId => {
		return await this.data.findMany({
			where: { userId },
			include: { company: true }, // company 정보 포함
		});
	};
}
