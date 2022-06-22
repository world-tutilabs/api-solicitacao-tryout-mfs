import { PrismaClient } from '@prisma/client'
import { TryoutModel } from '../../../../domain/models/tryout'
export const PrismaHelper = {
   prisma: new PrismaClient(),
   async mapInjectionProcess (data: object): Promise<TryoutModel> {
    return data[0]
   } 
   
}
