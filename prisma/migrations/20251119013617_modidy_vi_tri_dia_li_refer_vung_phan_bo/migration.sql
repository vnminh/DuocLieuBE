/*
  Warnings:

  - You are about to drop the column `id_vung_phan_bo` on the `Dac_diem_sinh_hoc` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dac_diem_sinh_hoc" DROP CONSTRAINT "Dac_diem_sinh_hoc_id_vung_phan_bo_fkey";

-- AlterTable
ALTER TABLE "Dac_diem_sinh_hoc" DROP COLUMN "id_vung_phan_bo";

-- AlterTable
ALTER TABLE "Vi_tri_dia_li" ADD COLUMN     "id_vung_phan_bo" INTEGER;

-- AddForeignKey
ALTER TABLE "Vi_tri_dia_li" ADD CONSTRAINT "Vi_tri_dia_li_id_vung_phan_bo_fkey" FOREIGN KEY ("id_vung_phan_bo") REFERENCES "Vung_phan_bo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
