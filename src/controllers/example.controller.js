import HttpStatus from "../utils/HttpStatus.js";

export class ExampleController {
  constructor(exampleService) {
    this.service = exampleService; // 이 부분에서 service에 연결합니다.
  }

  // 여기서 api로써 통신합니다.
  // 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
  // 주로 받아온 요청의 유효성을 검사합니다.
  // 따라서 superstruct나 validation 관련 코드는 여기에 많이 작성됩니다.
  // validation은 위쪽 router에서도 사용되고는 하는데, 이에 대해서는 그쪽에 주석 남기겠습니다.
  // 응답의 status를 지정하고, body를 전달합니다.
  getCount = async (req, res) => {
    // 여기서 파라미터를 받아옴
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    const resBody = await this.service.getCount({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    res.status(HttpStatus.SUCCESS).json(resBody);
  };
}
