import { Prisma } from "@prisma/duoclieu-client";

export class QueryBuilder{
    static buildQueryFilter(ten_dia_phan_hanh_chinh:string=''){
        var where = {}
        if (ten_dia_phan_hanh_chinh.trim()) where = {
            ten_dia_phan_hanh_chinh: {
                equals: ten_dia_phan_hanh_chinh.trim(),
                mode: 'insensitive' as Prisma.QueryMode,
            }
        }
        return where;
    }

    static buildAllVungPhanBoFilter(ten_dia_phan_hanh_chinh?: string){
        const where: Prisma.Vung_phan_boWhereInput = {};
        const conditions: any[] = [];

        if (ten_dia_phan_hanh_chinh?.trim()) {
            conditions.push({
                ten_dia_phan_hanh_chinh: {
                    contains: ten_dia_phan_hanh_chinh.trim(),
                    mode: 'insensitive' as Prisma.QueryMode,
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
