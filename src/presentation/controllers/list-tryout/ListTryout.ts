
import { IListTryout } from "../../../domain/usecases/list-tryout/list-tryout";
import { serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListTryout  implements Controller {

    constructor(private readonly listTryout: IListTryout){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
           const teste = this.listTryout.list();
           return ok(teste);
        } catch (error) {
            return serverError(error);
        }
    }

}