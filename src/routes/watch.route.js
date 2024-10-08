import express from 'express';
import { watchController } from '../containers/watch.container.js';

export const watchRouter = express.Router();

// 입력값 유효성 검사 미들웨어
function validation(req, res, next) {
	const { page, pageSize } = req.query;
	if (page && isNaN(Number(page))) throw new TypeError('page should be an integer');
	if (pageSize && isNaN(Number(pageSize))) throw new TypeError('pageSize should be an integer');
	next();
}

watchRouter.use(validation);

// API 엔드포인트 설정
watchRouter.post('/select', watchController.selectMyCompany);
watchRouter.get('/select/:userId', watchController.getMyCompany);
