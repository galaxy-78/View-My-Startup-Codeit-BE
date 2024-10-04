/*
  Warnings:

  - You are about to alter the column `pwdEncrypted` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(104)`.
  - You are about to alter the column `salt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(32)`.
  - You are about to alter the column `sessionSalt` on the `UserSession` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(32)`.
  - You are about to alter the column `sessionEncrypted` on the `UserSession` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(104)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pwdEncrypted" SET DATA TYPE CHAR(104),
ALTER COLUMN "salt" SET DATA TYPE CHAR(32);

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "sessionSalt" SET DATA TYPE CHAR(32),
ALTER COLUMN "sessionEncrypted" SET DATA TYPE CHAR(104);
