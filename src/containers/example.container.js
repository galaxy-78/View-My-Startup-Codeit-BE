import { prismaClient } from '../connection/postgres.connection.js';
import { ExampleData } from '../data/example.data.js';
import { ExampleService } from '../services/example.service.js';
import { ExampleController } from '../controllers/example.controller.js';

// 여기서 Data, Service, Controller를 한번에 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const exampleData = new ExampleData(prismaClient);
const exampleService = new ExampleService(exampleData);
export const exampleController = new ExampleController(exampleService);

