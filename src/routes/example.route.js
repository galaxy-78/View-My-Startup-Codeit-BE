import express from 'express';
import { exampleController } from '../containers/example.container.js';

export const exampleRouter = express.Router(); // export 해주어야 합니다.

// 각 개별의 메소드가 아니라 전체적으로 공통되는 validation이 필요한 경우가 있습니다.
// 그런 경우 app.js나 route.js에 작성합니다.
// validation의 위치에 대해서는 개인차가 있으니, 개인의 생각에 따라 작성해주시면 됩니다.
function validation(req, res, next) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const limit = req.query.limit;

  if (page && isNaN(Number(page)))
    throw new TypeError('page should be an integer');
  if (pageSize && isNaN(Number(pageSize)))
    throw new TypeError('pageSize should be an integer');
  if (limit && isNaN(Number(limit)))
    throw new TypeError('limit should be an integer');

  next(); // validation 이후에 다음 함수를 불러줍니다.
}
// validation 함수를 연결합니다.
exampleRouter.use(validation);

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.get이 아닙니다. router.get입니다.
exampleRouter.get('/', exampleController.getCount);
