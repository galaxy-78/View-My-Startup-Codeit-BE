import express from 'express';
import { companyController } from '../containers/company.container.js';

export const companyRouter = express.Router(); // export 해주어야 합니다.

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.get이 아닙니다. router.get입니다.
companyRouter.get('/', companyController.getCount);
