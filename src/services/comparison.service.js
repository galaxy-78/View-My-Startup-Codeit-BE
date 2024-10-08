export class ComparisonService {
	constructor(comparisonData) {
		this.data = comparisonData;
	}

	// 비교 기업 선택 및 총 수 가져오기
	selectCompareCompanies = async (selectedCompanyIds, userId) => {
		const selectedCompanies = await Promise.all(
			selectedCompanyIds.map(
				companyId => this.data.findCompanyById(companyId), // 회사 ID로 회사 정보 가져오기
			),
		);

		const totalCount = selectedCompanies.length;

		return { list: selectedCompanies, totalCount }; // list와 totalCount로 반환
	};

	// 비교할 기업 선택 해제
	removeCompareCompany = async (companyId, userId) => {
		return await this.data.removeCompareCompany(companyId, userId);
	};

	getCompareCompanies = async userId => {
		return await this.data.getCompareCompanies(userId);
	};
}
