import HttpStatus from "../utils/HttpStatus.js";

export class ComparisonController {
	constructor(comparisonService) {
		this.service = comparisonService;
	}

	// 비교할 기업 선택
	selectCompareCompanies = async (req, res) => {
		const { selectedCompanyIds, userId } = req.body;
		try {
			const results = await this.service.selectCompareCompanies(selectedCompanyIds, userId);
			res.status(200).json({ list: results, totalCount: results.length });
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};

	// 선택한 사용자의 비교 기업 목록 가져오기
	getCompareCompanies = async (req, res) => {
		const { userId } = req.params;
		try {
			const result = await this.service.getCompareCompanies(userId);
			res.status(HttpStatus.SUCCESS).json(result);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};
}
