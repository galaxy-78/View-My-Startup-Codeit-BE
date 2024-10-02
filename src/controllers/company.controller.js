export class CompanyController {
	constructor(companyService) {
		this.service = companyService; // 이 부분에서 service에 연결합니다.
	}

	// 여기서 api로써 통신합니다.
	// 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
	// 주로 받아온 요청의 유효성을 검사합니다.
	// 따라서 superstruct나 validation 관련 코드는 여기에 많이 작성됩니다.
	// validation은 위쪽 router에서도 사용되고는 하는데, 이에 대해서는 그쪽에 주석 남기겠습니다.
	// 응답의 status를 지정하고, body를 전달합니다.

	// 기업 리스트 가져오기
	getCompanies = async (req, res) => {
		const { keyword = '', page = 1, pageSize = 5, orderBy = 'recent' } = req.query;
		try {
			const companies = await this.service.getCompanies({
				keyword,
				page,
				pageSize,
				orderBy,
			});
			res.status(200).json(companies);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

	// 기업 수 가져오기
	getCount = async (req, res) => {
		const keyword = req.query.keyword || '';
		try {
			const count = await this.service.getCount({ keyword });
			res.status(200).json({ count });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

	// 내 기업 선택
	selectMyCompany = async (req, res) => {
		const { companyId } = req.body;
		const userId = req.user.id; // 로그인된 사용자 정보 예시
		try {
			const myCompany = await this.service.selectMyCompany(companyId, userId);
			res.status(200).json(myCompany);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

	// 비교할 기업 선택
	selectCompareCompanies = async (req, res) => {
		const { selectedCompanyIds } = req.body;
		const userId = req.user.id; // 로그인된 사용자 정보 예시
		try {
			const compareCompanies = await this.service.selectCompareCompanies(selectedCompanyIds, userId);
			res.status(200).json(compareCompanies);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};
}
