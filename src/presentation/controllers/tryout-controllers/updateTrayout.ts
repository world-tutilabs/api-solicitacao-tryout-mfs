import { UpdateTryout } from "../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout";
import { serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class UpdateTryoutController  {
  
  constructor (private readonly tryout: UpdateTryout) {}

  // handle(httpRequest: HttpRequest): Promise<HttpResponse> {
  //   try {
  //     this.tryout.update(httpRequest.body)
  //   } catch (error) {
  //     serverError(error)
  //   }

   
  // }
}