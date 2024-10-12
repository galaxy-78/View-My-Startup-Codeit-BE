-- CreateTable
CREATE TABLE "SocialLogin" (
    "state" CHAR(32) NOT NULL,
    "ip" CHAR(45) NOT NULL,
    "sW" INTEGER NOT NULL,
    "sH" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialLogin_pkey" PRIMARY KEY ("state","ip")
);
