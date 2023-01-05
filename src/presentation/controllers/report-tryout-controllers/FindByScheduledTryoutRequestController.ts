

import { IFindByScheduledTryoutRequest } from "../../../domain/useCases/ReportTryout/IFindByScheduledTryoutRequest";
import { ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class FindByScheduledTryoutRequestController implements Controller{
    constructor(
        private readonly findByScheduledTryoutRequest: IFindByScheduledTryoutRequest
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { id } = httpRequest.params
       const find = await this.findByScheduledTryoutRequest.findByScheduledTryoutRequest(id)
       
        return ok(find);
        
          
    }

    
}