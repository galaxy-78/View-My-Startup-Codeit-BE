/*
  Warnings:

  - Added the required column `pwdEncrypted` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "iter" INTEGER NOT NULL DEFAULT 10000,
ADD COLUMN     "pwdEncrypted" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL;
