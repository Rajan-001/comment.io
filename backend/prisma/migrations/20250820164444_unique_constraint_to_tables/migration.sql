/*
  Warnings:

  - A unique constraint covering the columns `[plan_Id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[User_Id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_plan_Id_key" ON "public"."Orders"("plan_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_User_Id_key" ON "public"."Orders"("User_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_id_key" ON "public"."Plan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_id_key" ON "public"."UserInfo"("id");
