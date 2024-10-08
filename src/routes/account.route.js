import express from 'express';
import { accountController } from '../containers/account.container.js';
import { authController } from '../containers/auth.container.js';
import { userSessionController } from '../containers/userSession.container.js';
import { userController } from '../containers/user.container.js';

export const accountRouter = express.Router(); // export 해주어야 합니다.

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.get이 아닙니다. router.get입니다.
// accountRouter.post('/log-in', authController.postLogin);
// accountRouter.post('/log-out', userSessionController.postLogout);
// accountRouter.post('/check', userController.postCheck);
// accountRouter.post('/sign-up', userController.postSignup);
// accountRouter.post('/iter', userController.postPwdIter);
// accountRouter.post('/session-iter', userSessionController.postSsnIter);
// accountRouter.get('/users', userController.getUsers);
accountRouter.post('/log-in', accountController.postLogin);
accountRouter.post('/log-out', accountController.postLogout);
accountRouter.post('/check', accountController.postCheck);
accountRouter.post('/sign-up', accountController.postSignup);
accountRouter.post('/iter', accountController.postPwdIter);
accountRouter.get('/session-iter', accountController.getSsnIter);
accountRouter.get('/sessions', accountController.getSsns);
accountRouter.get('/users', accountController.getUsers);
