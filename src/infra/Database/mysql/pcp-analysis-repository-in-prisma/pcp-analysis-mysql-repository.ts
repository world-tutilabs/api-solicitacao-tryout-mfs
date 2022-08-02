import { prisma } from "@prisma/client";
import { IFindByHomologateTryoutPCPRepository } from "../../../../data/protocols/database/AnalysisPCP/find-by-homologate-tryout-pcp-repository";
import { IHomologationRepositoryInRepository } from "../../../../data/protocols/database/AnalysisPCP/homologate-pcp-repository";
import { IListTryoutAnalysisPCRepository } from "../../../../data/protocols/database/AnalysisPCP/list-pcp-analysis-repository";
import { IListTryoutRepository } from "../../../../data/protocols/database/SolicitationTryout/New-Mold/list-tryout-repository";
import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";
import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IHomologate } from "../../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { AppError } from "../../../../presentation/errors/AppError";
import { ServerError } from "../../../../presentation/errors/server-error";
import { PrismaHelper } from "../helpers/prisma-helper";

export class AnalysisPCPMysqlRepository implements 
IListTryoutAnalysisPCRepository, 
IHomologationRepositoryInRepository, 
IFindByHomologateTryoutPCPRepository {
 
    async homologate({id, status, userHomologate, comment}: IHomologate): Promise<IHomologateTryoutDTO> {
        try {

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
             }).then(async () => {
              
              const homologate = await this.findByHomologateTryout(id);
              
              return homologate;
  
             })
  
           return data;

        } catch (error) {
         
         throw new AppError('Erro ao conectar com banco de dados', 500)
      }

    }
   async list(): Promise<IHomologateTryoutDTO[]> {

      try {

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
                     injectionProcess: {
                        select: {
                           id: true,
                           id_tryout: true,
                           proc_technician: true,
                           quantity: true,
                           mold: true,
                           feedstock: true,
                           labor: true,
                           machine: true
                        }
                     },
                  }
               },
               created_user: true,
               created_at: true,
               homologation_user: true,
               homologation_at: true,
               comment: true,
               status: {
                  select:{
                     id: true,
                     description: true,
                  }
               },
              },
              where: {
               fk_homologation_status: 3
              },
              orderBy: {
               solicitation:{
                  number_tryout:'desc'
               }  
              }
              
      })

       return tryouts;
  
      }catch(error){
  
         throw new AppError('Erro ao conectar com banco de dados', 500)
  
      }     
   }

   async findByHomologateTryout(id: string): Promise<IHomologateTryoutDTO> {
        const tryout = await PrismaHelper.prisma.homologation.findFirst({     
          select: {
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
                  injectionProcess: {
                     select: {
                        id: true,
                        id_tryout: true,
                        proc_technician: true,
                        quantity: true,
                        mold: true
                     }
                  },
               }
            },
            created_user: true,
            created_at: true,
            homologation_user: true,
            homologation_at: true,
            comment: true,
            status: true,
         },
             where: {
                  id
                     }
                  })
        return tryout;
   }
    
}