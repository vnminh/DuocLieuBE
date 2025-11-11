import { Prisma } from "@prisma/duoclieu-client";

export class QueryBuilder{
    

    static buildPageFilter(page:number=1, limit:number=100){
        return {
            skip:(page-1)*limit,
            take: limit,
        }
    }
}