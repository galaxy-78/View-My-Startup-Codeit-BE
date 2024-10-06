import { prismaClient } from '../connection/postgres.connection.js';
import { UserData } from '../data/user.data.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const userData = new UserData(prismaClient);
const userService = new UserService(userData);
export const userController = new UserController(userService);
