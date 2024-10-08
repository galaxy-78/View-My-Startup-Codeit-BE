export class ComparisonService {
	constructor(comparisonData) {
		this.data = comparisonData;
	}

	// 비교 기업 선택 및 총 수 가져오기
	selectCompareCompanies = async (selectedCompanyIds, userId) => {
		const selectedCompanies = await Promise.all(
			selectedCompanyIds.map(async companyId => {
				await this.data.createComparison(userId, companyId);

				return this.data.findCompanyById(companyId); // 회사 정보 반환
			}),
		);

		const totalCount = selectedCompanies.length;

		return { list: selectedCompanies, totalCount }; // list와 totalCount로 반환
	};

	getCompareCompanies = async userId => {
		return await this.data.getCompareCompanies(userId);
	};
}
