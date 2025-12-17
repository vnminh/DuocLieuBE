import { Prisma } from "@prisma/duoclieu-client";

export class QueryBuilder{

    static buildQueryFilter(ten_khoa_hoc?: string, ten_ho_khoa_hoc?: string, ten_nganh_khoa_hoc?: string, vung_phan_bo_id?: number){
        const where: Prisma.LoaiWhereInput = {};
        const conditions: any[] = [];

        if (ten_khoa_hoc?.trim()) {
            conditions.push({
                OR: [
                    {
                        ten_khoa_hoc: {
                            contains: ten_khoa_hoc.trim(),
                            mode: 'insensitive' as Prisma.QueryMode,
                        }
                    },
                    {
                        ten_tieng_viet: {
                            contains: ten_khoa_hoc.trim(),
                            mode: 'insensitive' as Prisma.QueryMode,
                        }
                    }
                ]
            });
        }

        if (ten_ho_khoa_hoc?.trim()) {
            conditions.push({
                ten_ho_khoa_hoc: {
                    equals: ten_ho_khoa_hoc.trim(),
                    mode: 'insensitive' as Prisma.QueryMode,
                }
            });
        }

        if (ten_nganh_khoa_hoc?.trim()) {
            conditions.push({
                ho: {
                    ten_nganh_khoa_hoc: {
                        equals: ten_nganh_khoa_hoc.trim(),
                        mode: 'insensitive' as Prisma.QueryMode,
                    }
                }
            });
        }

        if (vung_phan_bo_id !== undefined && vung_phan_bo_id !== null) {
            conditions.push({
                vi_tri_dia_li: {
                    some: {
                        id_vung_phan_bo: {
                            equals: vung_phan_bo_id
                        }
                    }
                }
            });
        }

        if (conditions.length > 0) {
            where.AND = conditions;
        }

        return where;
    }

    static buildPageFilter(page:number=1, limit:number=100){
        return {
            skip:(page-1)*limit,
            take: limit,
        }
    }
}