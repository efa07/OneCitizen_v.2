-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "faydaId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "nationality" TEXT,
    "gender" TEXT,
    "birthdate" TEXT,
    "picture" TEXT,
    "region" TEXT,
    "zone" TEXT,
    "woreda" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_faydaId_key" ON "User"("faydaId");

-- AddForeignKey
ALTER TABLE "ServiceApplication" ADD CONSTRAINT "ServiceApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceApplication" ADD CONSTRAINT "ServiceApplication_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "PublicService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
