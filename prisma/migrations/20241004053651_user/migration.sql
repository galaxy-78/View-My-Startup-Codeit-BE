/*
  Warnings:

  - You are about to alter the column `revenue` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "revenue" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "UserSession" (
    "iter" INTEGER NOT NULL DEFAULT 1000,
    "userId" TEXT NOT NULL,
    "sessionSalt" TEXT NOT NULL,
    "sessionEncrypted" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("userId","createdAt")
);

-- CreateIndex
CREATE INDEX "UserSession_userId_createdAt_idx" ON "UserSession"("userId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
