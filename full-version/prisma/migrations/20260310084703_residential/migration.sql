-- CreateEnum
CREATE TYPE "HouseStatus" AS ENUM ('NOT_COMPLETED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "floorsCount" INTEGER NOT NULL,
    "status" "HouseStatus" NOT NULL,
    "background" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "houseId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "planImage" TEXT,
    "layer" INTEGER,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "floorId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "area" DECIMAL(10,2) NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "isCommissioned" BOOLEAN NOT NULL,
    "article" TEXT,
    "planImage" TEXT,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DealStatus" NOT NULL,

    CONSTRAINT "PurchaseRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Floor_houseId_idx" ON "Floor"("houseId");

-- CreateIndex
CREATE INDEX "Apartment_floorId_idx" ON "Apartment"("floorId");

-- CreateIndex
CREATE INDEX "PurchaseRequest_userId_idx" ON "PurchaseRequest"("userId");

-- CreateIndex
CREATE INDEX "PurchaseRequest_apartmentId_idx" ON "PurchaseRequest"("apartmentId");

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequest" ADD CONSTRAINT "PurchaseRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequest" ADD CONSTRAINT "PurchaseRequest_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
