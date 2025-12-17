import { Prisma } from "@prisma/duoclieu-client";

export class QueryBuilder{
    
    static buildQueryFilter(emailOfNamePattern?:string, status?: string){
        const where: Prisma.UserWhereInput = {};
        const conditions: any[] = []
        if (emailOfNamePattern?.trim()){
            conditions.push({
                email: {
                    contains: emailOfNamePattern,
                    mode: 'insensitive' as Prisma.QueryMode,
                },
                full_name: {
                    contains: emailOfNamePattern,
                    mode: 'insensitive' as Prisma.QueryMode,
                }
            })
        }
        if (status?.trim()){
            conditions.push({
                status:{
                    equals: status,
                    mode: 'insensitive' as Prisma.QueryMode,
                }
            })
        }
        if (conditions.length > 0) {
            where.AND = conditions;
        }

        return where
    }

    static buildPageFilter(page:number=1, limit:number=100){
        return {
            skip:(page-1)*limit,
            take: limit,
        }
    }
}