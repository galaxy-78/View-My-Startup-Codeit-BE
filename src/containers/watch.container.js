import { prismaClient } from '../connection/postgres.connection.js';
import { WatchData } from '../data/watch.data.js';
import { WatchService } from '../services/watch.service.js';
import { WatchController } from '../controllers/watch.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const watchData = new WatchData(prismaClient);
const watchService = new WatchService(watchData);
export const watchController = new WatchController(watchService);
