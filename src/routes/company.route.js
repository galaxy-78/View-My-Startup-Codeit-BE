import express from 'express';
import { companyController } from '../containers/company.container.js';

export const companyRouter = express.Router();

// 입력값 유효성 검사 미들웨어
function validation(req, res, next) {
	const { page, pageSize } = req.query;
	if (page && isNaN(Number(page))) throw new TypeError('page should be an integer');
	if (pageSize && isNaN(Number(pageSize))) throw new TypeError('pageSize should be an integer');
	next();
}

companyRouter.use(validation);

// API 엔드포인트 설정
companyRouter.get('/', companyController.getCompanies); // 기업 리스트 API
companyRouter.get('/count', companyController.getCount); // 기업 수 API
companyRouter.post('/my-company', companyController.selectMyCompany); // 내 기업 선택 API
companyRouter.post('/compare-companies', companyController.selectCompareCompanies); // 비교할 기업 선택 API
