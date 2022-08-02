import Handlebars from "handlebars";
import path from "path";
import { IHomologate } from "../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { IReportTryoutHomologation } from "../../../domain/useCases/ReportTryout/IReportTryoutHomologation";
var fs = require('fs');
import { AppError } from "../../../presentation/errors/AppError";
import { IFindByHomologateTryoutPCPRepository } from "../../protocols/db/AnalysisPCP/find-by-homologate-tryout-pcp-repository";
import { IHomologationRepositoryInRepository } from "../../protocols/db/AnalysisPCP/homologate-pcp-repository";
import { IFindByRequestTryoutRepository } from "../../protocols/db/ReportTryout/find-by-request-tryout-repository";

export class DbHomologateReportTryout implements IReportTryoutHomologation{

    constructor(
    private readonly findByHomologateTryoutPCPRepository: IFindByHomologateTryoutPCPRepository,
    private readonly findByRequestTryoutRepository: IFindByRequestTryoutRepository,
    private readonly homologationRepositoryInRepository: IHomologationRepositoryInRepository,
    ){}

  async reportTryoutHomologation({id, status}: IHomologate): Promise<void> {
  const data = await this.findByRequestTryoutRepository.findByRequestTryoutRepository(id);
  const findHomologate = await this.findByHomologateTryoutPCPRepository.findByHomologateTryout(id);

   if(findHomologate.status.id != 1 && findHomologate.status.id < 5 ){
    throw new AppError('Solicitação de Tryout precisa está aprovada para ser concluida', 401);
   }

   if(findHomologate.status.id == 5){
    throw new AppError('Solicitação de Tryout já foi concluida', 401);
   }

    if(status != 5){
    throw new AppError('Status de Tryout Inexistente', 401);
    }

    if(data){

      await this.homologationRepositoryInRepository.homologate({id, status});
     
    }else{

       throw new AppError('Data programada expirou', 401);
     
      }
  }
    

}