import express from 'express';
import { accountController } from '../containers/account.container.js';

export const accountRouter = express.Router(); // export 해주어야 합니다.

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.get이 아닙니다. router.get입니다.
accountRouter.post('/log-in', accountController.postLogin);
accountRouter.post('/check', accountController.postCheck);
accountRouter.post('/sign-up', accountController.postSignup);
accountRouter.post('/iter', accountController.postPwdIter);
accountRouter.post('/session-iter', accountController.postSsnIter);
accountRouter.get('/users', accountController.getUsers);
