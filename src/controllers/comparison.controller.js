export class ComparisonController {
	constructor(comparisonService) {
		this.service = comparisonService;
	}

	// 비교할 기업 선택
	selectCompareCompanies = async (req, res) => {
		const { selectedCompanyIds } = req.body;
		const userId = req.user.id; // 인증된 유저 ID를 가져옴
		try {
			const compareCompanies = await this.service.selectCompareCompanies(selectedCompanyIds, userId);
			res.status(200).json(compareCompanies);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

	// 비교할 기업 선택 해제
	removeCompareCompany = async (req, res) => {
		const { companyId } = req.params;
		const userId = req.user.id; // 인증된 유저 ID를 가져옴
		try {
			const result = await this.service.removeCompareCompany(companyId, userId);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

	// 선택한 사용자의 비교 기업 목록 가져오기
	getCompareCompanies = async (req, res) => {
		const userId = req.user.id;
		try {
			const result = await this.service.getCompareCompanies(userId);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};
}
