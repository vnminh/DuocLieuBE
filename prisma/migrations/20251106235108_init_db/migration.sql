-- CreateEnum
CREATE TYPE "Muc_do_quy_hiem" AS ENUM ('thap', 'trung_binh', 'cao', 'rat_cao');

-- CreateTable
CREATE TABLE "Nganh" (
    "id" SERIAL NOT NULL,
    "ten_khoa_hoc" TEXT NOT NULL,
    "ten_tieng_viet" TEXT,
    "mo_ta" TEXT,

    CONSTRAINT "Nganh_pkey" PRIMARY KEY ("ten_khoa_hoc")
);

-- CreateTable
CREATE TABLE "Ho" (
    "id" SERIAL NOT NULL,
    "ten_khoa_hoc" TEXT NOT NULL,
    "ten_tieng_viet" TEXT,
    "mo_ta" TEXT,
    "ten_nganh_khoa_hoc" TEXT NOT NULL,

    CONSTRAINT "Ho_pkey" PRIMARY KEY ("ten_khoa_hoc")
);

-- CreateTable
CREATE TABLE "Loai" (
    "id" SERIAL NOT NULL,
    "ten_khoa_hoc" TEXT NOT NULL,
    "ten_tieng_viet" TEXT,
    "ten_goi_khac" TEXT,
    "ten_ho_khoa_hoc" TEXT NOT NULL,

    CONSTRAINT "Loai_pkey" PRIMARY KEY ("ten_khoa_hoc")
);

-- CreateTable
CREATE TABLE "Dac_diem_sinh_hoc" (
    "id" SERIAL NOT NULL,
    "ten_loai_khoa_hoc" TEXT NOT NULL,
    "mo_ta" TEXT,
    "dang_song" TEXT,
    "id_vung_phan_bo" INTEGER,
    "tru_luong" TEXT,
    "muc_do_quy_hiem" "Muc_do_quy_hiem" NOT NULL,
    "phuong_an_bao_ton" TEXT,

    CONSTRAINT "Dac_diem_sinh_hoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cong_dung_va_thanh_phan_hoa_hoc" (
    "id" SERIAL NOT NULL,
    "ten_loai_khoa_hoc" TEXT NOT NULL,
    "bo_phan_su_dung" TEXT,
    "cong_dung" TEXT,
    "bai_thuoc" TEXT,
    "tac_dung_duoc_ly" TEXT,

    CONSTRAINT "Cong_dung_va_thanh_phan_hoa_hoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Khai_thac_va_che_bien" (
    "id" SERIAL NOT NULL,
    "ten_loai_khoa_hoc" TEXT NOT NULL,
    "chi_tiet_ky_thuat" TEXT,
    "hien_trang_gay_trong_phat_trien" TEXT,
    "ky_thuat_trong_cham_soc_thu_hoach" TEXT,

    CONSTRAINT "Khai_thac_va_che_bien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hinh_anh" (
    "id" SERIAL NOT NULL,
    "ten_loai_khoa_hoc" TEXT NOT NULL,
    "collection_uri" TEXT,

    CONSTRAINT "Hinh_anh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vi_tri_dia_li" (
    "id" SERIAL NOT NULL,
    "ten_loai_khoa_hoc" TEXT NOT NULL,
    "kinh_do" DOUBLE PRECISION NOT NULL,
    "vi_do" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vi_tri_dia_li_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vung_phan_bo" (
    "id" SERIAL NOT NULL,
    "ten_dia_phan_hanh_chinh" TEXT NOT NULL,
    "danh_sach_diem_bien" TEXT,

    CONSTRAINT "Vung_phan_bo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nganh_id_key" ON "Nganh"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ho_id_key" ON "Ho"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Loai_id_key" ON "Loai"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dac_diem_sinh_hoc_ten_loai_khoa_hoc_key" ON "Dac_diem_sinh_hoc"("ten_loai_khoa_hoc");

-- CreateIndex
CREATE UNIQUE INDEX "Khai_thac_va_che_bien_ten_loai_khoa_hoc_key" ON "Khai_thac_va_che_bien"("ten_loai_khoa_hoc");

-- CreateIndex
CREATE UNIQUE INDEX "Hinh_anh_ten_loai_khoa_hoc_key" ON "Hinh_anh"("ten_loai_khoa_hoc");

-- AddForeignKey
ALTER TABLE "Ho" ADD CONSTRAINT "Ho_ten_nganh_khoa_hoc_fkey" FOREIGN KEY ("ten_nganh_khoa_hoc") REFERENCES "Nganh"("ten_khoa_hoc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loai" ADD CONSTRAINT "Loai_ten_ho_khoa_hoc_fkey" FOREIGN KEY ("ten_ho_khoa_hoc") REFERENCES "Ho"("ten_khoa_hoc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dac_diem_sinh_hoc" ADD CONSTRAINT "Dac_diem_sinh_hoc_ten_loai_khoa_hoc_fkey" FOREIGN KEY ("ten_loai_khoa_hoc") REFERENCES "Loai"("ten_khoa_hoc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dac_diem_sinh_hoc" ADD CONSTRAINT "Dac_diem_sinh_hoc_id_vung_phan_bo_fkey" FOREIGN KEY ("id_vung_phan_bo") REFERENCES "Vung_phan_bo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cong_dung_va_thanh_phan_hoa_hoc" ADD CONSTRAINT "Cong_dung_va_thanh_phan_hoa_hoc_ten_loai_khoa_hoc_fkey" FOREIGN KEY ("ten_loai_khoa_hoc") REFERENCES "Loai"("ten_khoa_hoc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Khai_thac_va_che_bien" ADD CONSTRAINT "Khai_thac_va_che_bien_ten_loai_khoa_hoc_fkey" FOREIGN KEY ("ten_loai_khoa_hoc") REFERENCES "Loai"("ten_khoa_hoc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hinh_anh" ADD CONSTRAINT "Hinh_anh_ten_loai_khoa_hoc_fkey" FOREIGN KEY ("ten_loai_khoa_hoc") REFERENCES "Loai"("ten_khoa_hoc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vi_tri_dia_li" ADD CONSTRAINT "Vi_tri_dia_li_ten_loai_khoa_hoc_fkey" FOREIGN KEY ("ten_loai_khoa_hoc") REFERENCES "Loai"("ten_khoa_hoc") ON DELETE RESTRICT ON UPDATE CASCADE;
