/*
  Warnings:

  - The primary key for the `SocialLogin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "SocialLogin" DROP CONSTRAINT "SocialLogin_pkey",
ALTER COLUMN "ip" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "authorizor" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "nickname" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "SocialLogin_pkey" PRIMARY KEY ("state", "ip");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "ip" SET DATA TYPE VARCHAR(45);
