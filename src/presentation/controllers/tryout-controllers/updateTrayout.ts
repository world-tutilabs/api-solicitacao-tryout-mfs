import { UpdateTryout } from "../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout";
import { serverError } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../protocols";

export class UpdateTryoutController  {
  
  constructor (private readonly tryout: UpdateTryout) {}

  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      console.log(httpRequest.params)
      this.tryout.update(httpRequest.body)
      return null
    } catch (error) {
      serverError(error)
    }   
  }
}