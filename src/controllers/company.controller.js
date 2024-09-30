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
}
