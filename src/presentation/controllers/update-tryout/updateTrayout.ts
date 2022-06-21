import { UpdateTryout } from "../../../domain/usecases/update-tryout/update-tryout";
import { serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class UpdateTryoutController implements Controller {
  private readonly tryout: UpdateTryout
  constructor (tryout: UpdateTryout) {
    this.tryout = tryout
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.tryout.update(httpRequest.body)
    } catch (error) {
      serverError(error)
    }
   
  }
}