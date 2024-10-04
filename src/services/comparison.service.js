export class ComparisonService {
	constructor(comparisonData) {
		this.data = comparisonData;
	}

	// 비교할 기업 선택
	selectCompareCompanies = async (selectedCompanyIds, userId) => {
		// 이미 선택된 비교 기업 수 가져오기
		const existingComparisons = await this.data.getCompaniesByUser(userId);

		// 총 선택한 기업의 수가 5개를 넘는지 확인
		if (existingComparisons.length + selectedCompanyIds.length > 5) {
			throw new Error('비교할 기업은 최대 5개까지 선택 가능합니다.');
		}

		// 선택한 기업들을 추가
		return await this.data.selectCompareCompanies(selectedCompanyIds, userId);
	};

	// 비교할 기업 선택 해제
	removeCompareCompany = async (companyId, userId) => {
		return await this.data.removeCompareCompany(companyId, userId);
	};

	getCompareCompanies = async userId => {
		return await this.data.getCompareCompanies(userId);
	};
}
