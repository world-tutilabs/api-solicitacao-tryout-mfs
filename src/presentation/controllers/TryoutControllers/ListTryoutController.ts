
import { IListTryout } from "../../../domain/useCases/list-tryout/list-tryout";
import { serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListTryoutController  implements Controller {

    constructor(private readonly listTryout: IListTryout){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      
        try {

           const list = await this.listTryout.list();

           return ok(list);

        } catch (error) {

            return serverError(error);

        }
    }

}