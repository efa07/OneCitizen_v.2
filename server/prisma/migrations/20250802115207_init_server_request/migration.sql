/*
  Warnings:

  - You are about to drop the `ServiceApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceApplication" DROP CONSTRAINT "ServiceApplication_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceApplication" DROP CONSTRAINT "ServiceApplication_userId_fkey";

-- DropTable
DROP TABLE "ServiceApplication";

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "response" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);
