/*
  Warnings:

  - You are about to drop the column `data` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ServiceRequest` table. All the data in the column will be lost.
  - Added the required column `address` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraData` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faydaId` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "data",
DROP COLUMN "userId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "extraData" JSONB NOT NULL,
ADD COLUMN     "faydaId" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "zone" TEXT NOT NULL;
