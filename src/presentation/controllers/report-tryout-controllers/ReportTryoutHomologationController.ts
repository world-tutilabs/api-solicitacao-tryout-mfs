
import { IHomologationTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { IReportTryoutHomologation } from "../../../domain/useCases/ReportTryout/IReportTryoutHomologation";
import { AppError } from "../../errors/AppError";
import { ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ReportTryoutHomologationController implements Controller{
    constructor(
        private readonly reportTryoutHomologation: IReportTryoutHomologation
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { id } = httpRequest.params
        
        await this.reportTryoutHomologation.reportTryoutHomologation({ id, status : 5})
       
        return ok({ message: "Concluido com sucesso."});
        
          
    }

    
}