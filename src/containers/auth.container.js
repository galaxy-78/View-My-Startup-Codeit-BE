import { prismaClient } from '../connection/postgres.connection.js';
import { UserSessionData } from '../data/userSession.data.js';
import { UserSessionService } from '../services/userSession.service.js';
import { AuthController } from '../controllers/auth.controller.js';
import { UserData } from '../data/user.data.js';
import { UserService } from '../services/user.service.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const userData = new UserData(prismaClient);
const userSessionData = new UserSessionData(prismaClient);
const userService = new UserService(userData);
const userSessionService = new UserSessionService(userSessionData);
export const authController = new AuthController(userService, userSessionService);
