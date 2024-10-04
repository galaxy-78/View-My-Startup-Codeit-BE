import express from 'express';
import { companyController } from '../containers/company.container.js';

export const companyRouter = express.Router();

// 입력값 유효성 검사 미들웨어
function validation(req, res, next) {
	const { skip, take } = req.query;
	if (skip && isNaN(Number(skip))) throw new TypeError('skip should be an integer');
	if (take && isNaN(Number(take))) throw new TypeError('take should be an integer');
	next();
}

companyRouter.use(validation);

// API 엔드포인트 설정
companyRouter.get('/', companyController.getCompanies); // 기업 리스트 API
companyRouter.get('/count', companyController.getCompanyCount); // 기업 수 API
companyRouter.get('/:id', companyController.getCompanyById);
