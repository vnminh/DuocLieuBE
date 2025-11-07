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

    static buildPageFilter(page:number=1, limit:number=100){
        return {
            skip:(page-1)*limit,
            take: limit,
        }
    }
}