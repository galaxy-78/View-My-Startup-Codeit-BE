export class ComparisonService {
	constructor(comparisonData) {
		this.data = comparisonData;
	}

	// 비교 기업 선택 및 총 수 가져오기
	selectCompareCompanies = async (selectedCompanyIds, userId) => {
		const selectedCompanies = await Promise.all(
			selectedCompanyIds.map(async companyId => {
				return await this.data.createComparison(companyId, userId);
			}),
		);

		return selectedCompanies;
	};

	getCompareCompanies = async userId => {
		return await this.data.getCompareCompanies(userId);
	};
}
