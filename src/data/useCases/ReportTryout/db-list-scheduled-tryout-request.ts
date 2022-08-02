
import { IHomologateTryoutDTO } from "../../../domain/models/IHomologateTryoutDTO";
import { IListScheduledTryoutRequest } from "../../../domain/useCases/ReportTryout/IListScheduledTryoutRequest";

var fs = require('fs');

import { IListRequestTryoutHomologateRepository } from "../../protocols/database/ReportTryout/list-request-tryout-homologate-repository";

export class DbListScheduledTryoutRequest implements IListScheduledTryoutRequest{

    constructor(
    private readonly listRequestTryoutHomologateRepository: IListRequestTryoutHomologateRepository,
    ){}
  async listScheduledTryoutRequest(): Promise<IHomologateTryoutDTO[]> {

       
        return await this.listRequestTryoutHomologateRepository.listRequestTryoutHomologate()
    
  }

    

}