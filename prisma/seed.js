import { USER } from '../mock/mock.js';
import { prismaClient as prisma } from '../src/connection/postgres.connection.js';

async function main() {
  await prisma.$transaction([prisma.user.deleteMany()]);

  await prisma.$transaction([
    prisma.user.createMany({
      data: USER,
      skipDuplicates: true,
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
