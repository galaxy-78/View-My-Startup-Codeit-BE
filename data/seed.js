import { PrismaClient } from "@prisma/client";
import { USER, COMPANY, INVESTMENT } from "./mock";
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany();
	await prisma.company.deleteMany();
	await prisma.investment.deleteMany();
}
