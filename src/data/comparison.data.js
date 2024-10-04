export class ComparisonData {
	constructor(client) {
		this.data = client.Comparison; // Comparison 모델을 연결합니다.
	}

	// 비교할 기업 선택
	selectCompareCompanies = async (selectedCompanyIds, userId) => {
		const selectedCompanies = [];
		for (const companyId of selectedCompanyIds) {
			const existingComparison = await this.data.findFirst({
				where: { userId, companyId },
			});

			if (!existingComparison) {
				await this.data.create({ data: { userId, companyId } });
				selectedCompanies.push(companyId);
			}
		}
		return selectedCompanies;
	};

	// 특정 기업 선택 해제
	removeCompareCompany = async (companyId, userId) => {
		return await this.data.deleteMany({
			where: { userId, companyId },
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
