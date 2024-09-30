import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient({
  log: [
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prismaClient.$on('info', (e) => {
  console.log(e);
});

prismaClient.$on('warn', (e) => {
  console.log(e);
});

prismaClient.$on('error', (e) => {
  console.log(e);
});
