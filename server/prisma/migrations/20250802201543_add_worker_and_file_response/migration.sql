/*
  Warnings:

  - You are about to drop the column `responseNote` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "responseNote" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "responseNote";
