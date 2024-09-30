import { prismaClient } from '../connection/postgres.connection.js';
import { InvestmentData } from '../data/investment.data.js';
import { InvestmentService } from '../services/investment.service.js';
import { InvestmentController } from '../controllers/investment.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const investmentData = new InvestmentData(prismaClient);
const investmentService = new InvestmentService(investmentData);
export const investmentController = new InvestmentController(investmentService);
