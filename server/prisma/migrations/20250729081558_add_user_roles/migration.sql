/*
  Warnings:

  - You are about to drop the column `faydaId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CITIZEN', 'ADMIN', 'DEPARTMENT_HEAD', 'HR_MANAGER');

-- DropIndex
DROP INDEX "User_faydaId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "faydaId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CITIZEN';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
