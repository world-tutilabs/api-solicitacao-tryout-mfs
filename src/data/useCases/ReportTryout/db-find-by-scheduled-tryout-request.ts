
import { IHomologateTryoutDTO } from "../../../domain/models/IHomologateTryoutDTO";
import { IFindByScheduledTryoutRequest } from "../../../domain/useCases/ReportTryout/IFindByScheduledTryoutRequest";
import { IFindByRequestTryoutRepository } from "../../protocols/database/ReportTryout/find-by-request-tryout-repository";

var fs = require('fs');

export class DbFindByScheduledTryoutRequest implements IFindByScheduledTryoutRequest{

    constructor(
    private readonly requestTryoutRepository: IFindByRequestTryoutRepository,
    ){}

  async findByScheduledTryoutRequest( id: string): Promise<IHomologateTryoutDTO> {
    return await this.requestTryoutRepository.findByRequestTryoutRepository(id)
  }


    

}