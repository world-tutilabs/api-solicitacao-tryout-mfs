import { PrismaClient } from '@prisma/client'
import { ISolicitationTryoutDTO } from '../../../../domain/models/ISolicitationTryoutDTO'
export const PrismaHelper = {
   prisma: new PrismaClient(),
   async mapInjectionProcess (data: object): Promise<ISolicitationTryoutDTO> {
    return data[0]
   } 
   
}
