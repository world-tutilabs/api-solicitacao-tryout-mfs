import { IListTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IList-Tryout-PCP";
import { ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListTryoutPCPController implements Controller {

    constructor(
        private readonly listTryoutPCP: IListTryoutPCP
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
             
        const data = await this.listTryoutPCP.listAnalysisPCP();

        return ok(data);    
    
    }


}