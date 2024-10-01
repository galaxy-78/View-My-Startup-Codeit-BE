import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { Prisma } from '@prisma/client';
import { CastError, TypeError, ValidationError } from './error.js';
import { StructError } from 'superstruct';
import { exampleRouter } from './routes/example.route.js';
import { companyRouter } from './routes/company.route.js';
import { investmentRouter } from './routes/investment.route.js';

const app = express();
app.use(cors());
app.use(express.json());

/***************************    ROUTES    **************************************************/
app.use('/example', exampleRouter); // /example로 이어지는 주소는 이 라우터로 갑니다.
app.use('/companies', companyRouter); // /companies로 이어지는 주소는 이 라우터로 갑니다.
app.use('/investments', investmentRouter); // /investments로 이어지는 주소는 이 라우터로 갑니다.

/***************************    HANDLER    **************************************************/
function errorHandler(err, req, res, next) {
	console.error(err);
	if (err instanceof Prisma.PrismaClientValidationError || err instanceof TypeError || err instanceof ValidationError) {
		res.status(400).send({ message: err.message });
	} else if (
		err instanceof StructError ||
		(err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') ||
		err instanceof CastError
	) {
		res.sendStatus(404);
	} else {
		res.status(500).send({ message: err.message });
	}
}

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
