import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListTryoutPCPController implements Controller {
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }


}