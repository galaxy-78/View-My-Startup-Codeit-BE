import express from 'express';
import { accountController } from '../containers/account.container.js';
import { authController } from '../containers/auth.container.js';
import { userSessionController } from '../containers/userSession.container.js';
import { userController } from '../containers/user.container.js';

export const accountRouter = express.Router(); // export 해주어야 합니다.

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.get이 아닙니다. router.get입니다.
accountRouter.post('/log-in', authController.postLogin);
accountRouter.post('/sign-up', authController.postSignup);
accountRouter.post('/check', userController.postCheck);
accountRouter.post('/iter', userController.postPwdIter);
accountRouter.post('/session-iter', userSessionController.postSsnIter);
accountRouter.post('/log-out', userSessionController.postLogout);
accountRouter.post('/log-out-from-all', userSessionController.postLogoutFromAll);
accountRouter.get('/users', userController.getUsers);



accountRouter.post('/log-out-from-all', accountController.postLogoutFromAll);
accountRouter.post('/sessions', accountController.postSsns);
// accountRouter.post('/log-in', accountController.postLogin);
// accountRouter.post('/sign-up', accountController.postSignup);
// accountRouter.post('/check', accountController.postCheck);
// accountRouter.post('/iter', accountController.postPwdIter);
// accountRouter.post('/session-iter', accountController.postSsnIter);
// accountRouter.post('/log-out', accountController.postLogout);
// accountRouter.get('/users', accountController.getUsers);
