import { prismaClient } from '../connection/postgres.connection.js';
import { AccountData } from '../data/account.data.js';
import { AccountService } from '../services/account.service.js';
import { AccountController } from '../controllers/account.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const accountData = new AccountData(prismaClient);
const accountService = new AccountService(accountData);
export const accountController = new AccountController(accountService);
