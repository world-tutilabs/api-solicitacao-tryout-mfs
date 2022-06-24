import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class FindTryoutPCPController implements Controller {
    constructor(private readonly ){}
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }

    
}