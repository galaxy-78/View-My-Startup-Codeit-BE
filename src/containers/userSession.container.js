import { prismaClient } from '../connection/postgres.connection.js';
import { UserSessionData } from '../data/userSession.data.js';
import { UserSessionService } from '../services/userSession.service.js';
import { UserSessionController } from '../controllers/userSession.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const userSessionData = new UserSessionData(prismaClient);
const userSessionService = new UserSessionService(userSessionData);
export const userSessionController = new UserSessionController(userSessionService);
