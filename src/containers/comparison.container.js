import { prismaClient } from '../connection/postgres.connection.js';
import { ComparisonData } from '../data/comparison.data.js';
import { ComparisonService } from '../services/comparison.service.js';
import { ComparisonController } from '../controllers/comparison.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const comparisonData = new ComparisonData(prismaClient);
const comparisonService = new ComparisonService(comparisonData);
export const comparisonController = new ComparisonController(comparisonService);
