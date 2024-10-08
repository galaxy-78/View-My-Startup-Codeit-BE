/*
  Warnings:

  - Added the required column `ip` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSession" ADD COLUMN     "ip" CHAR(45) NOT NULL;
