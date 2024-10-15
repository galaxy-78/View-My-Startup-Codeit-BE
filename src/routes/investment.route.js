import express from 'express';
import { investmentController } from '../containers/investment.container.js';

export const investmentRouter = express.Router(); // export 해주어야 합니다.

function validation(req, res, next) {
	const page = req.query.page;
	const pageSize = req.query.pageSize;

	if (page && isNaN(Number(page))) throw new TypeError('page should be an integer');
	if (pageSize && isNaN(Number(pageSize))) throw new TypeError('pageSize should be an integer');

	next();
}

investmentRouter.use(validation);

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.get이 아닙니다. router.get입니다.
investmentRouter.get('/', investmentController.getInvestments);
investmentRouter.get('/:companyId', investmentController.getInvestments);
investmentRouter.get('/:companyId/total', investmentController.getTotalAmount);

investmentRouter.post('/', investmentController.postInvestment);

investmentRouter.patch('/:id', investmentController.patchInvestment);

investmentRouter.delete('/:id', investmentController.deleteInvestment);

investmentRouter.get('/user/:userId', investmentController.getMyInvestments);