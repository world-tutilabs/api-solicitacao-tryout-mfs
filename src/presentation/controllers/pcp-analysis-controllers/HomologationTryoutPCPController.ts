
import { IHomologationTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { serverError, success,ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class HomologationTryoutPCPController implements Controller{
    constructor(
        private readonly homologationTryoutPCP: IHomologationTryoutPCP
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { id } = httpRequest.params
        const { status, comment, user } = httpRequest.body
        
       try {

        await this.homologationTryoutPCP.homologateTryout({ id, status, comment, userHomologate: user})
       
        return ok({ message: "homologation success"});
        
       } catch (error) {
        
       return serverError(error);

       }
          
    }

    
}