-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "email" TEXT,
ADD COLUMN     "provider" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
