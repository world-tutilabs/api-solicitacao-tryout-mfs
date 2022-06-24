import { prisma } from "@prisma/client";
import { IListTryoutAnalysisPCRepository } from "../../../../data/protocols/db/AnalysisPCP/list-pcp-analysis-repository";
import { IListTryoutRepository } from "../../../../data/protocols/db/SolicitationTryout/New-Mold/list-tryout-repository";
import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { PrismaHelper } from "../helpers/prisma-helper";

export class AnalysisPCPMysqlRepository implements IListTryoutAnalysisPCRepository {
    list(): Promise<ISolicitationTryoutDTO[]> {
        throw new Error("Method not implemented.");
    }

    // list(): Promise<ISolicitationTryoutDTO[]> {
       
    //     PrismaHelper.prisma.homologation.findMany({
    //      select:{
           
    //      },
    //      where:{
    //         status:{
    //             description: "",
    //         }
    //      }
            
    //     })
    // } 
   
    
}