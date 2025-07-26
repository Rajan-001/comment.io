-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'success', 'failed', 'created', 'attempted', 'paid');

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "upadatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "plan_Id" INTEGER NOT NULL,
    "User_Id" INTEGER NOT NULL,
    "order_Id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_signature" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "razorpay_order_id" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PaymentsToUserInfo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PaymentsToUserInfo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PaymentsToPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PaymentsToPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_order_Id_key" ON "Orders"("order_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_razorpay_payment_id_key" ON "Payments"("razorpay_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_razorpay_order_id_key" ON "Payments"("razorpay_order_id");

-- CreateIndex
CREATE INDEX "_PaymentsToUserInfo_B_index" ON "_PaymentsToUserInfo"("B");

-- CreateIndex
CREATE INDEX "_PaymentsToPlan_B_index" ON "_PaymentsToPlan"("B");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "UserInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_plan_Id_fkey" FOREIGN KEY ("plan_Id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("order_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentsToUserInfo" ADD CONSTRAINT "_PaymentsToUserInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentsToUserInfo" ADD CONSTRAINT "_PaymentsToUserInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentsToPlan" ADD CONSTRAINT "_PaymentsToPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentsToPlan" ADD CONSTRAINT "_PaymentsToPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
