
import { IListTryout } from "../../../domain/useCases/SolicitationTryout/New-Mold/list-tryout";
import { serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListTryoutController  implements Controller {

    constructor(private readonly listTryout: IListTryout){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      
        try {
            const { limit, offset} = httpRequest.query
              console.log({httpRequest});
              
           const list = await this.listTryout.list(limit,offset);

           return ok(list);

        } catch (error) {

            return serverError(error);

        }
    }

}