-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "processedById" TEXT;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
