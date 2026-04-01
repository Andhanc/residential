-- DropIndex
DROP INDEX IF EXISTS "PurchaseRequest_apartmentId_meetingAt_key";

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseRequest_meetingAt_key" ON "PurchaseRequest"("meetingAt");

