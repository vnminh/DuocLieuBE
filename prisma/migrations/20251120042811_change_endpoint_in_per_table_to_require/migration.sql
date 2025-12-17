/*
  Warnings:

  - Made the column `endpoint` on table `Permission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "endpoint" SET NOT NULL;
