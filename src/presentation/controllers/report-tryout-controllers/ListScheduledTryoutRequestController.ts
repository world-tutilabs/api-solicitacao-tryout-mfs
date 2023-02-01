
import { IHomologationTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { IListScheduledTryoutRequest } from "../../../domain/useCases/ReportTryout/IListScheduledTryoutRequest";
import { IReportTryoutHomologation } from "../../../domain/useCases/ReportTryout/IReportTryoutHomologation";
import { AppError } from "../../errors/AppError";
import { ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListScheduledTryoutRequestController implements Controller{
    constructor(
        private readonly listScheduledTryoutRequest: IListScheduledTryoutRequest
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
  
       const list = await this.listScheduledTryoutRequest.listScheduledTryoutRequest();
       
        return ok({list});
        
          
    }

    
}