import { Prisma } from "@prisma/duoclieu-client";
import { contains } from "class-validator";

export class QueryBuilder{
    static buildQueryFilter(ten_khoa_hoc:string='', ten_ho_khoa_hoc:string='', ten_nganh_khoa_hoc:string=''){
        const where:Prisma.LoaiWhereInput = {}
        const condition:any[] = []

        if (ten_khoa_hoc.trim()) condition.push({
            ten_khoa_hoc: {
                contains:ten_khoa_hoc.trim(),
                mode: 'insensitive' as Prisma.QueryMode,
            }
        })

        if (ten_ho_khoa_hoc.trim()) condition.push({
            ten_ho_khoa_hoc: {
                equals:ten_ho_khoa_hoc.trim(),
                mode: 'insensitive' as Prisma.QueryMode,
            }
        })

        if (ten_nganh_khoa_hoc.trim()) condition.push({
            ten_nganh_khoa_hoc: {
                equals:ten_nganh_khoa_hoc.trim(),
                mode: 'insensitive' as Prisma.QueryMode,
            }
        })

        if (condition.length){
            where.AND = condition;
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