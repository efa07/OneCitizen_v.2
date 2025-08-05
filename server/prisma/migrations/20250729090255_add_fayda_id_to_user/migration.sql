/*
  Warnings:

  - A unique constraint covering the columns `[faydaId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "faydaId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_faydaId_key" ON "User"("faydaId");
