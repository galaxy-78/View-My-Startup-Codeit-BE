/*
  Warnings:

  - You are about to drop the column `AccumulInvest` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `selectedCount` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the `Ownership` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accumulInvest` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Ownership" DROP CONSTRAINT "Ownership_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Ownership" DROP CONSTRAINT "Ownership_ownerId_fkey";

-- DropIndex
DROP INDEX "Company_ownerId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "AccumulInvest",
DROP COLUMN "ownerId",
DROP COLUMN "selectedCount",
ADD COLUMN     "accumulInvest" BIGINT NOT NULL;

-- DropTable
DROP TABLE "Ownership";

-- CreateTable
CREATE TABLE "Watch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Watch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
