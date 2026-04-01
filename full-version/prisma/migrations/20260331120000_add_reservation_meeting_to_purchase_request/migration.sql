-- AlterTable
ALTER TABLE "PurchaseRequest"
ADD COLUMN     "isReservation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "meetingAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseRequest_apartmentId_meetingAt_key" ON "PurchaseRequest"("apartmentId", "meetingAt");

