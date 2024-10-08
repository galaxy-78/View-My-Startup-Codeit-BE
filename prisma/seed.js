import { USER, COMPANY, INVESTMENT } from '../mock/mock.js';
import { prismaClient as prisma } from '../src/connection/postgres.connection.js';
import encrypt, { generateRandomHexString, ITER_FULL } from '../src/utils/encrypt.js';

function getRandomInteger(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	const diff = maxFloored - minCeiled;
	const rand = Math.random();

	return Math.floor(rand * (diff + 1) + minCeiled);
}

async function main() {
	await prisma.watch.deleteMany();
	await prisma.comparison.deleteMany();
	await prisma.userSession.deleteMany();
	await prisma.investment.deleteMany();
	await prisma.company.deleteMany();
	await prisma.user.deleteMany();

	await Promise.all(
		USER.map(async user => {
			user.salt = generateRandomHexString();
			user.pwdEncrypted = encrypt(user.salt, user.password, ITER_FULL);
			delete user.password;
			user.iter = ITER_FULL - 1;
			await prisma.user.create({ data: user });
		}),
	);
	await prisma.company.createMany({
		data: COMPANY,
		skipDuplicates: true,
	});

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
	for (let i = 0; i < 1000; i += 1) {
		let newWatch = {
			userId: userIds[getRandomInteger(0, userIds.length - 1)],
			companyId: companyIds[getRandomInteger(0, companyIds.length - 1)]
		};
		await prisma.watch.create({
			data: newWatch,
		});
	}
	for (let i = 0; i < 5000; i += 1) {
		let newComparison = {
			userId: userIds[getRandomInteger(0, userIds.length - 1)],
			companyId: companyIds[getRandomInteger(0, companyIds.length - 1)]
		}
		await prisma.comparison.create({
			data: newComparison,
		});
	}
}

main()
	.catch(async e => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
