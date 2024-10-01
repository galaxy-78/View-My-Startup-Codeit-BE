import { USER, COMPANY, INVESTMENT } from '../mock/mock.js';
import { prismaClient as prisma } from '../src/connection/postgres.connection.js';

function getRandomInteger(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	const diff = maxFloored - minCeiled;
	const rand = Math.random();

	return Math.floor(rand * (diff + 1) + minCeiled);
}

async function main() {
	await prisma.$transaction([prisma.user.deleteMany(), prisma.company.deleteMany(), prisma.investment.deleteMany()]);

	await prisma.$transaction([
		prisma.user.createMany({
			data: USER,
			skipDuplicates: true,
		}),
		prisma.company.createMany({
			data: COMPANY,
			skipDuplicates: true,
		}),
	]);

	// 관계형 데이터 처리
	// investments
	const userIds = (await prisma.user.findMany()).map(u => u.id);
	const companyIds = (await prisma.company.findMany()).map(c => c.id);
	const newInvestments = INVESTMENT.map(investment => {
		return {
			...investment,
			userId: userIds[getRandomInteger(0, userIds.length - 1)],
			companyId: companyIds[getRandomInteger(0, companyIds.length - 1)],
		};
	});
	await prisma.investment.createMany({
		data: newInvestments,
		skipDuplicates: true,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.log(e);
		await prisma.$disconnect();
		process.exit(1);
	});
