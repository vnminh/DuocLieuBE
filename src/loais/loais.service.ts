import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import {
  SearchLoaiDto,
  CreateLoaiWithDetailsDto,
  UpdateLoaiWithDetailsDto,
} from './dto/request-loais.dto';
import { LoaisMapper } from './mapper/loais.mapper';
import {
  ResponseCreateLoaiDto,
  ResponseUpdateLoaiDto,
  ResponseSearchLoaiDto,
  ResponseDeleteLoaiDto,
  ResponseCreateManyLoaiDto,
  ResponseImageCountDto,
  ResponseImageUploadDto,
  ResponseImageDeleteDto,
} from './dto/response-loais.dto';
import { ResponseAllLoaisDto } from './dto/response-loais.dto';
import { Muc_do_quy_hiem } from '@prisma/duoclieu-client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoaisService {
  private readonly uploadDir = path.join(__dirname, '..', '..', 'upload');

  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Loais Service, Hello World!';
  }

  /**
   * Create upload folder for a loai's images
   * Path: upload/{id}/
   */
  private createUploadFolder(id: number): string {
    const folderPath = path.join(this.uploadDir, id.toString());
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    return folderPath;
  }

  /**
   * Get the upload folder path for a loai
   */
  getUploadFolderPath(id: number): string {
    return path.join(this.uploadDir, id.toString());
  }

  /**
   * Upload a preview image for a loai
   * Saves to upload/{id}/{next_index}.jpg and updates so_luong_anh_preview
   */
  async uploadPreviewImage(
    id: number,
    file: { buffer: Buffer; originalname: string; mimetype: string },
  ): Promise<ResponseImageUploadDto> {
    // Ensure upload folder exists
    const folderPath = this.createUploadFolder(id);

    // Get current image count
    const hinhAnh = await this.prisma.hinh_anh.findFirst({
      where: { ten_loai_khoa_hoc: (await this.prisma.loai.findUnique({ where: { id } }))?.ten_khoa_hoc },
    });
    const currentCount = hinhAnh?.so_luong_anh_preview ?? 0;
    const newIndex = currentCount;

    // Save the file
    const filePath = path.join(folderPath, `${newIndex}.jpg`);
    fs.writeFileSync(filePath, file.buffer);

    // Update so_luong_anh_preview
    const loai = await this.prisma.loai.findUnique({ where: { id } });
    if (loai) {
      await this.prisma.hinh_anh.upsert({
        where: { ten_loai_khoa_hoc: loai.ten_khoa_hoc },
        create: {
          ten_loai_khoa_hoc: loai.ten_khoa_hoc,
          so_luong_anh_preview: 1,
        },
        update: {
          so_luong_anh_preview: currentCount + 1,
        },
      });
    }

    return {
      message: 'Image uploaded successfully',
      data: {
        index: newIndex,
        count: currentCount + 1,
      },
    };
  }

  /**
   * Delete a preview image for a loai
   * Removes the file and reindexes remaining images
   */
  async deletePreviewImage(id: number, index: number): Promise<ResponseImageDeleteDto> {
    const folderPath = this.getUploadFolderPath(id);

    // Get current image count
    const loai = await this.prisma.loai.findUnique({ where: { id } });
    if (!loai) {
      throw new NotFoundException('Loai not found');
    }

    const hinhAnh = await this.prisma.hinh_anh.findFirst({
      where: { ten_loai_khoa_hoc: loai.ten_khoa_hoc },
    });
    const currentCount = hinhAnh?.so_luong_anh_preview ?? 0;

    if (index < 0 || index >= currentCount) {
      throw new NotFoundException('Image not found');
    }

    // Delete the file
    const filePath = path.join(folderPath, `${index}.jpg`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Reindex remaining images (shift all images after deleted index down by 1)
    for (let i = index + 1; i < currentCount; i++) {
      const oldPath = path.join(folderPath, `${i}.jpg`);
      const newPath = path.join(folderPath, `${i - 1}.jpg`);
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }
    }

    // Update so_luong_anh_preview
    await this.prisma.hinh_anh.update({
      where: { ten_loai_khoa_hoc: loai.ten_khoa_hoc },
      data: {
        so_luong_anh_preview: Math.max(0, currentCount - 1),
      },
    });

    return {
      message: 'Image deleted successfully',
      data: {
        deletedIndex: index,
        count: currentCount - 1,
      },
    };
  }

  async findOneById(id: number) {
    const loai = await this.prisma.loai.findUnique({
      where: { id },
      include: {
        ho: {
          include: {
            nganh: true,
          },
        },
        dac_diem_sinh_hoc: true,
        cong_dung_va_thanh_phan_hoa_hoc: true,
        khai_thac_va_che_bien: true,
        vi_tri_dia_li: {
          include: {
            vung_phan_bo: true,
          },
        },
        hinh_anh: true,
      },
    });
    if (!loai) return null;
    return LoaisMapper.toResponseUniqueLoaiDto(loai);
  }

  async findByTenKhoaHoc(ten_khoa_hoc: string) {
    const loai = await this.prisma.loai.findUnique({
      where: { ten_khoa_hoc },
      include: {
        ho: {
          include: {
            nganh: true,
          },
        },
        dac_diem_sinh_hoc: true,
        cong_dung_va_thanh_phan_hoa_hoc: true,
        khai_thac_va_che_bien: true,
        vi_tri_dia_li: {
          include: {
            vung_phan_bo: true,
          },
        },
        hinh_anh: true,
      },
    });
    if (!loai) return null;
    return LoaisMapper.toResponseUniqueLoaiDto(loai);
  }

  async create(data: {
    ten_khoa_hoc: string;
    ten_tieng_viet?: string;
    ten_goi_khac?: string;
    ten_ho_khoa_hoc: string;
  }): Promise<ResponseCreateLoaiDto> {
    const loai = await this.prisma.loai.create({ data });
    return LoaisMapper.toResponseCreateLoaiDto(loai);
  }

  async createMany(
    items: {
      ten_khoa_hoc: string;
      ten_tieng_viet?: string;
      ten_goi_khac?: string;
      ten_ho_khoa_hoc: string;
    }[],
  ): Promise<ResponseCreateManyLoaiDto> {
    const createdLoais = await this.prisma.loai.createManyAndReturn({
      data: items,
    });
    return LoaisMapper.toResponseCreateManyLoaiDto(createdLoais);
  }

  async createWithDetails(
    data: CreateLoaiWithDetailsDto,
  ): Promise<ResponseCreateLoaiDto> {
    const {
      ten_khoa_hoc,
      ten_tieng_viet,
      ten_goi_khac,
      ten_ho_khoa_hoc,
      dac_diem_mo_ta,
      dang_song,
      tru_luong,
      muc_do_quy_hiem,
      phuong_an_bao_ton,
      chi_tiet_ky_thuat,
      hien_trang_gay_trong_phat_trien,
      ky_thuat_trong_cham_soc_thu_hoach,
      collection_uri,
      so_luong_anh_preview,
      bo_phan_su_dung,
      cong_dung,
      bai_thuoc,
      kinh_do,
      vi_do,
      id_vung_phan_bo,
    } = data;

    // Create loai with all related data
    const loai = await this.prisma.loai.create({
      data: {
        ten_khoa_hoc,
        ten_tieng_viet,
        ten_goi_khac,
        ten_ho_khoa_hoc,
        // Create Dac_diem_sinh_hoc if any field is provided
        ...((dac_diem_mo_ta ||
          dang_song ||
          tru_luong ||
          muc_do_quy_hiem ||
          phuong_an_bao_ton) && {
          dac_diem_sinh_hoc: {
            create: {
              mo_ta: dac_diem_mo_ta,
              dang_song,
              tru_luong,
              muc_do_quy_hiem: (muc_do_quy_hiem as Muc_do_quy_hiem) || 'THAP',
              phuong_an_bao_ton,
            },
          },
        }),
        // Create Khai_thac_va_che_bien if any field is provided
        ...((chi_tiet_ky_thuat ||
          hien_trang_gay_trong_phat_trien ||
          ky_thuat_trong_cham_soc_thu_hoach) && {
          khai_thac_va_che_bien: {
            create: {
              chi_tiet_ky_thuat,
              hien_trang_gay_trong_phat_trien,
              ky_thuat_trong_cham_soc_thu_hoach,
            },
          },
        }),
        // Create Hinh_anh if provided
        ...((collection_uri || so_luong_anh_preview !== undefined) && {
          hinh_anh: {
            create: {
              collection_uri,
              so_luong_anh_preview: so_luong_anh_preview ?? 0,
            },
          },
        }),
        // Create Cong_dung_va_thanh_phan_hoa_hoc (array)
        ...((bo_phan_su_dung || cong_dung || bai_thuoc) && {
          cong_dung_va_thanh_phan_hoa_hoc: {
            create: this._buildCongDungArray(
              bo_phan_su_dung,
              cong_dung,
              bai_thuoc,
            ),
          },
        }),
        // Create Vi_tri_dia_li (array)
        ...((kinh_do || vi_do) && {
          vi_tri_dia_li: {
            create: this._buildViTriArray(kinh_do, vi_do, id_vung_phan_bo),
          },
        }),
      },
      include: {
        dac_diem_sinh_hoc: true,
        khai_thac_va_che_bien: true,
        hinh_anh: true,
        cong_dung_va_thanh_phan_hoa_hoc: true,
        vi_tri_dia_li: { include: { vung_phan_bo: true } },
        ho: { include: { nganh: true } },
      },
    });

    // Create upload folder for images
    this.createUploadFolder(loai.id);

    return LoaisMapper.toResponseCreateLoaiDto(loai);
  }

  async createManyWithDetails(
    items: CreateLoaiWithDetailsDto[],
  ): Promise<ResponseCreateManyLoaiDto> {
    const createdLoais = await Promise.all(
      items.map((item) => this.createWithDetails(item)),
    );
    return LoaisMapper.toResponseCreateManyLoaiDto(
      createdLoais.map((res) => res.data),
    );
  }

  private _buildCongDungArray(
    bo_phan_su_dung?: string[],
    cong_dung?: string[],
    bai_thuoc?: string[],
  ) {
    const maxLength = Math.max(
      bo_phan_su_dung?.length || 0,
      cong_dung?.length || 0,
      bai_thuoc?.length || 0,
    );

    const result: any[] = [];
    for (let i = 0; i < maxLength; i++) {
      result.push({
        bo_phan_su_dung: bo_phan_su_dung?.[i],
        cong_dung: cong_dung?.[i],
        bai_thuoc: bai_thuoc?.[i],
      });
    }
    return result;
  }

  private _buildViTriArray(
    kinh_do?: number[],
    vi_do?: number[],
    id_vung_phan_bo?: number[],
  ) {
    const maxLength = Math.max(
      kinh_do?.length || 0,
      vi_do?.length || 0,
      id_vung_phan_bo?.length || 0,
    );

    const result: any[] = [];
    for (let i = 0; i < maxLength; i++) {
      if (kinh_do?.[i] !== undefined && vi_do?.[i] !== undefined) {
        result.push({
          kinh_do: kinh_do[i],
          vi_do: vi_do[i],
          id_vung_phan_bo: id_vung_phan_bo?.[i],
        });
      }
    }
    return result;
  }

  async update(
    id: number,
    data: {
      ten_khoa_hoc?: string;
      ten_tieng_viet?: string;
      ten_goi_khac?: string;
      ten_ho_khoa_hoc?: string;
    },
  ): Promise<ResponseUpdateLoaiDto> {
    const loai = await this.prisma.loai.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    return LoaisMapper.toResponseUpdateLoaiDto(loai);
  }

  async updateWithDetails(
    id: number,
    data: UpdateLoaiWithDetailsDto,
  ): Promise<ResponseUpdateLoaiDto> {
    const {
      ten_khoa_hoc,
      ten_tieng_viet,
      ten_goi_khac,
      ten_ho_khoa_hoc,
      dac_diem_mo_ta,
      dang_song,
      tru_luong,
      muc_do_quy_hiem,
      phuong_an_bao_ton,
      chi_tiet_ky_thuat,
      hien_trang_gay_trong_phat_trien,
      ky_thuat_trong_cham_soc_thu_hoach,
      collection_uri,
      so_luong_anh_preview,
      bo_phan_su_dung,
      cong_dung,
      bai_thuoc,
      kinh_do,
      vi_do,
      id_vung_phan_bo,
    } = data;

    // Update loai basic fields
    const loaiUpdateData: any = {
      updated_at: new Date(),
    };
    if (ten_khoa_hoc !== undefined) loaiUpdateData.ten_khoa_hoc = ten_khoa_hoc;
    if (ten_tieng_viet !== undefined) loaiUpdateData.ten_tieng_viet = ten_tieng_viet;
    if (ten_goi_khac !== undefined) loaiUpdateData.ten_goi_khac = ten_goi_khac;
    if (ten_ho_khoa_hoc !== undefined) loaiUpdateData.ten_ho_khoa_hoc = ten_ho_khoa_hoc;

    // Update Dac_diem_sinh_hoc (upsert)
    const hasDacDiem = dac_diem_mo_ta !== undefined || dang_song !== undefined || 
      tru_luong !== undefined || muc_do_quy_hiem !== undefined || phuong_an_bao_ton !== undefined;
    
    if (hasDacDiem) {
      await this.prisma.dac_diem_sinh_hoc.upsert({
        where: { ten_loai_khoa_hoc: ten_khoa_hoc  },
        create: {
          ten_loai_khoa_hoc: ten_khoa_hoc||'',
          mo_ta: dac_diem_mo_ta,
          dang_song,
          tru_luong,
          muc_do_quy_hiem: (muc_do_quy_hiem as Muc_do_quy_hiem) || 'THAP',
          phuong_an_bao_ton,
        },
        update: {
          ...(dac_diem_mo_ta !== undefined && { mo_ta: dac_diem_mo_ta }),
          ...(dang_song !== undefined && { dang_song }),
          ...(tru_luong !== undefined && { tru_luong }),
          ...(muc_do_quy_hiem !== undefined && { muc_do_quy_hiem: muc_do_quy_hiem as Muc_do_quy_hiem }),
          ...(phuong_an_bao_ton !== undefined && { phuong_an_bao_ton }),
        },
      });
    }

    // Update Khai_thac_va_che_bien (upsert)
    const hasKhaiThac = chi_tiet_ky_thuat !== undefined || 
      hien_trang_gay_trong_phat_trien !== undefined || 
      ky_thuat_trong_cham_soc_thu_hoach !== undefined;
    
    if (hasKhaiThac) {
      await this.prisma.khai_thac_va_che_bien.upsert({
        where: { ten_loai_khoa_hoc: ten_khoa_hoc },
        create: {
          ten_loai_khoa_hoc: ten_khoa_hoc||'',
          chi_tiet_ky_thuat,
          hien_trang_gay_trong_phat_trien,
          ky_thuat_trong_cham_soc_thu_hoach,
        },
        update: {
          ...(chi_tiet_ky_thuat !== undefined && { chi_tiet_ky_thuat }),
          ...(hien_trang_gay_trong_phat_trien !== undefined && { hien_trang_gay_trong_phat_trien }),
          ...(ky_thuat_trong_cham_soc_thu_hoach !== undefined && { ky_thuat_trong_cham_soc_thu_hoach }),
        },
      });
    }

    // Update Hinh_anh (upsert)
    if (collection_uri !== undefined || so_luong_anh_preview !== undefined) {
      await this.prisma.hinh_anh.upsert({
        where: { ten_loai_khoa_hoc: ten_khoa_hoc },
        create: {
          ten_loai_khoa_hoc: ten_khoa_hoc||'',
          collection_uri,
          so_luong_anh_preview: so_luong_anh_preview ?? 0,
        },
        update: {
          ...(collection_uri !== undefined && { collection_uri }),
          ...(so_luong_anh_preview !== undefined && { so_luong_anh_preview }),
        },
      });
    }

    // Update Cong_dung_va_thanh_phan_hoa_hoc (delete all and recreate)
    const hasCongDung = bo_phan_su_dung !== undefined || cong_dung !== undefined ||
      bai_thuoc !== undefined;

    if (hasCongDung) {
      await this.prisma.cong_dung_va_thanh_phan_hoa_hoc.deleteMany({
        where: { ten_loai_khoa_hoc: ten_khoa_hoc },
      });

      const congDungArray = this._buildCongDungArray(
        bo_phan_su_dung,
        cong_dung,
        bai_thuoc,
      );
      
      if (congDungArray.length > 0) {
        await this.prisma.cong_dung_va_thanh_phan_hoa_hoc.createMany({
          data: congDungArray.map((item) => ({
            ten_loai_khoa_hoc: ten_khoa_hoc,
            ...item,
          })),
        });
      }
    }

    // Update Vi_tri_dia_li (delete all and recreate)
    const hasViTri = kinh_do !== undefined || vi_do !== undefined;
    
    if (hasViTri) {
      await this.prisma.vi_tri_dia_li.deleteMany({
        where: { ten_loai_khoa_hoc: ten_khoa_hoc},
      });
      
      const viTriArray = this._buildViTriArray(kinh_do, vi_do, id_vung_phan_bo);
      
      if (viTriArray.length > 0) {
        await this.prisma.vi_tri_dia_li.createMany({
          data: viTriArray.map((item) => ({
            ten_loai_khoa_hoc: ten_khoa_hoc,
            ...item,
          })),
        });
      }
    }

    // Update the loai itself
    const loai = await this.prisma.loai.update({
      where: { id },
      data: loaiUpdateData,
      include: {
        dac_diem_sinh_hoc: true,
        khai_thac_va_che_bien: true,
        hinh_anh: true,
        cong_dung_va_thanh_phan_hoa_hoc: true,
        vi_tri_dia_li: { include: { vung_phan_bo: true } },
        ho: { include: { nganh: true } },
      },
    });

    return LoaisMapper.toResponseUpdateLoaiDto(loai);
  }

  async remove(id: number): Promise<ResponseDeleteLoaiDto> {
    const loai = await this.prisma.loai.delete({ where: { id } });
    return LoaisMapper.toResponseDeleteLoaiDto(loai);
  }

  async allLoais(filter: {
    ten_khoa_hoc?: string;
    ten_ho_khoa_hoc?: string;
    ten_nganh_khoa_hoc?: string;
    vung_phan_bo_id?: string;
    page: number;
    limit: number;
  }): Promise<ResponseAllLoaisDto> {
    const where = QueryBuilder.buildQueryFilter(
      filter.ten_khoa_hoc,
      filter.ten_ho_khoa_hoc,
      filter.ten_nganh_khoa_hoc,
      filter.vung_phan_bo_id
        ? Number.parseInt(filter.vung_phan_bo_id)
        : undefined,
    );
    const pagination = QueryBuilder.buildPageFilter(filter.page, filter.limit);

    const loais = await this.prisma.loai.findMany({
      where,
      ...pagination,
      include: {
        ho: {
          select: {
            ten_khoa_hoc: true,
            ten_tieng_viet: true,
            nganh: {
              select: {
                ten_khoa_hoc: true,
                ten_tieng_viet: true,
              },
            },
          },
        },
        dac_diem_sinh_hoc: true,
        cong_dung_va_thanh_phan_hoa_hoc: true,
        khai_thac_va_che_bien: true,
        vi_tri_dia_li: {
          include: {
            vung_phan_bo: true,
          },
        },
        hinh_anh: true,
      },
      orderBy: {
        ten_khoa_hoc: 'asc',
      },
    });

    const total = await this.prisma.loai.count({
      where,
      ...pagination,
    });

    let n_pages = -1;
    if (filter.page === 1) {
      const allLoaisCount = await this.prisma.loai.count();
      n_pages = Math.ceil(allLoaisCount / filter.limit);
    }

    return LoaisMapper.toResponseAllLoaisDto(
      loais,
      total,
      n_pages !== -1 ? n_pages : undefined,
    );
  }

  /**
   * Get the count of images in a folder based on collection_uri
   */
  async getImageCount(id: number): Promise<ResponseImageCountDto> {
    const loai = await this.prisma.loai.findUnique({
      where: { id },
      include: { hinh_anh: true },
    });

    if (!loai) {
      throw new NotFoundException('Loai not found');
    }

    const collectionUri = loai.hinh_anh?.collection_uri;
    if (!collectionUri) {
      return {
        message: 'No image collection found',
        data: {
          count: 0,
          collection_uri: '',
        },
      };
    }

    try {
      // collection_uri is expected to be a folder path
      const folderPath = path.resolve(collectionUri);
      
      if (!fs.existsSync(folderPath)) {
        return {
          message: 'Image folder not found',
          data: {
            count: 0,
            collection_uri: collectionUri,
          },
        };
      }

      const files = fs.readdirSync(folderPath);
      // Filter for image files
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
      const imageFiles = files.filter(file => 
        imageExtensions.includes(path.extname(file).toLowerCase())
      );

      return {
        message: 'Image count retrieved successfully',
        data: {
          count: imageFiles.length,
          collection_uri: collectionUri,
        },
      };
    } catch (error) {
      return {
        message: 'Error reading image folder',
        data: {
          count: 0,
          collection_uri: collectionUri,
        },
      };
    }
  }

  /**
   * Get a specific image file path by index
   */
  async getImageByIndex(id: number, index: number): Promise<{ filePath: string; mimeType: string } | null> {
    const loai = await this.prisma.loai.findUnique({
      where: { id },
      include: { hinh_anh: true },
    });

    if (!loai) {
      throw new NotFoundException('Loai not found');
    }

    const collectionUri = loai.hinh_anh?.collection_uri;
    if (!collectionUri) {
      return null;
    }

    try {
      const folderPath = path.resolve(collectionUri);
      
      if (!fs.existsSync(folderPath)) {
        return null;
      }

      const files = fs.readdirSync(folderPath);
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
      const imageFiles = files
        .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
        .sort(); // Sort to ensure consistent ordering

      if (index < 0 || index >= imageFiles.length) {
        return null;
      }

      const fileName = imageFiles[index];
      const filePath = path.join(folderPath, fileName);
      const ext = path.extname(fileName).toLowerCase();
      
      const mimeTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.bmp': 'image/bmp',
        '.svg': 'image/svg+xml',
      };

      return {
        filePath,
        mimeType: mimeTypes[ext] || 'application/octet-stream',
      };
    } catch (error) {
      return null;
    }
  }
}
