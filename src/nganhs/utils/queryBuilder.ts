import { Prisma } from "@prisma/duoclieu-client";

export class QueryBuilder{
    static buildQueryFilter(ten_khoa_hoc:string=''){
        var where = {}
        if (ten_khoa_hoc.trim()) where = {
            ten_khoa_hoc: {
                equals: ten_khoa_hoc.trim(),
                mode: 'insensitive' as Prisma.QueryMode,
            }
        }
        return where;
    }

    static buildAllNganhsFilter(ten_khoa_hoc?: string){
        const where: Prisma.NganhWhereInput = {};
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