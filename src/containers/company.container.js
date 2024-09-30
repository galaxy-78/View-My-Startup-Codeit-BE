import { prismaClient } from '../connection/postgres.connection.js';
import { CompanyData } from '../data/company.data.js';
import { CompanyService } from '../services/company.service.js';
import { CompanyController } from '../controllers/company.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const companyData = new CompanyData(prismaClient);
const companyService = new CompanyService(companyData);
export const companyController = new CompanyController(companyService);
