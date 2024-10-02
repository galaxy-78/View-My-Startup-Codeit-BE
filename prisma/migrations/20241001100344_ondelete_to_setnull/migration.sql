-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_userId_fkey";

-- DropForeignKey
ALTER TABLE "Watch" DROP CONSTRAINT "Watch_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Watch" DROP CONSTRAINT "Watch_userId_fkey";

-- AlterTable
ALTER TABLE "Comparison" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Watch" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
