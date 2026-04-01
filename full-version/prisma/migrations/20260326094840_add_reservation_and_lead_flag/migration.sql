-- AlterTable
ALTER TABLE "Apartment" ADD COLUMN     "isReserved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reservedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isLead" BOOLEAN NOT NULL DEFAULT false;
