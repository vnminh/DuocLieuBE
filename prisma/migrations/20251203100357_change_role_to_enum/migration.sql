/*
  Warnings:

  - You are about to drop the column `role_id` on the `Role_Permission` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Role_Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'STAFF', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Role_Permission" DROP CONSTRAINT "Role_Permission_role_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Role" DROP CONSTRAINT "User_Role_role_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Role" DROP CONSTRAINT "User_Role_user_id_fkey";

-- AlterTable
ALTER TABLE "Role_Permission" DROP COLUMN "role_id",
ADD COLUMN     "role" "UserRole" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "User_Role";
