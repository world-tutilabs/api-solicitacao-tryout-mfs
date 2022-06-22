import { UpdateTryout } from "../../../domain/usecases/update-tryout/update-tryout";
import { serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class UpdateTryoutController  {
  private readonly tryout: UpdateTryout
  constructor (tryout: UpdateTryout) {
    this.tryout = tryout
  }
<<<<<<< HEAD
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.tryout.update(httpRequest.body)
    } catch (error) {
      serverError(error)
    }
=======
  // handle(httpRequest: HttpRequest): Promise<HttpResponse> {
  //   try {
  //     this.tryout.update(httpRequest.body)
  //   } catch (error) {
  //     serverError(error)
  //   }
>>>>>>> 4d1936c866db349762afe6caf81af6571accb25c
   
  // }
}