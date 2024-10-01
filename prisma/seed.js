import { USER, COMPANY, INVESTMENT } from "../mock/mock.js";
import { prismaClient as prisma } from '../src/connection/postgres.connection.js';
import encrypt, { generateRandomHexString, ITER_FULL } from '../src/encrypt.js';

async function main() {
	await prisma.user.deleteMany();
	await prisma.company.deleteMany();
	await prisma.investment.deleteMany();

	await Promise.all(
		USER.map(async user => {
			user.salt = generateRandomHexString();
			user.pwdEncrypted = encrypt(user.salt, user.password, ITER_FULL);
			delete user.password;
			user.iter = ITER_FULL - 1;
			await prisma.user.create({ data: user });
		})
	);
	// await prisma.company.createMany({
	// 	data: COMPANY,
	// 	skipDuplicates: true,
	// });
	// await prisma.investment.createMany({
	// 	data: INVESTMENT,
	// 	skipDuplicates: true,
	// })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
