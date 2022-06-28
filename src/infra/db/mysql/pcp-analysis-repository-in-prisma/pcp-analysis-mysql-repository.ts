import { prisma } from "@prisma/client";
import { IFindByHomologateTryoutPCPRepository } from "../../../../data/protocols/db/AnalysisPCP/find-by-homologate-tryout-pcp-repository";
import { IHomologationRepositoryInRepository } from "../../../../data/protocols/db/AnalysisPCP/homologate-pcp-repository";
import { IListTryoutAnalysisPCRepository } from "../../../../data/protocols/db/AnalysisPCP/list-pcp-analysis-repository";
import { IListTryoutRepository } from "../../../../data/protocols/db/SolicitationTryout/New-Mold/list-tryout-repository";
import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";
import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IHomologate } from "../../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { PrismaHelper } from "../helpers/prisma-helper";

export class AnalysisPCPMysqlRepository implements 
IListTryoutAnalysisPCRepository, 
IHomologationRepositoryInRepository, 
IFindByHomologateTryoutPCPRepository {
 
    async homologate({id, status, userHomologate, comment}: IHomologate): Promise<IHomologate> {

         const data = await PrismaHelper.prisma.homologation.update({
            data: {
               fk_homologation_status: status,
               homologation_user: userHomologate,
               homologation_at: new Date(),
               comment,
            },
            where: {
               id
            }
           })
         
           return {
            id: data.id,
            userHomologate: Object(data.homologation_user),
            fk_solicitation: data.fk_solicitation,
            status: data.fk_homologation_status,
            comment: data.comment
           };
   
    }
   async list(): Promise<IHomologateTryoutDTO[]> {
      const tryouts = await PrismaHelper.prisma.homologation.findMany({
              select : {
               id: true,
               fk_solicitation: true,
               solicitation: {
                  select: {
                     id: true,
                     number_tryout: true,
                     code_sap: true,
                     desc_product: true,
                     client: true,
                     programmed_date: true,
                     reason: true,
                     injectionProcess: true,
                  }
               },
               created_user: true,
               created_at: true,
               homologation_user: true,
               homologation_at: true,
               comment: true,
               status: true,
              }  
      })

       return tryouts;
    }

   async findByHomologateTryout(id: string): Promise<IHomologateTryoutDTO> {
        const tryout = await PrismaHelper.prisma.homologation.findFirst(
         {
             where: {
                  id
                     }
                  })
        return tryout;
   }
    
}