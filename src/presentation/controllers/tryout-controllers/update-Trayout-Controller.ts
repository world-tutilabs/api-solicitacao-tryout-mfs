import { UpdateTryout } from "../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout";
import { badRequest, noContent, notFound, serverError } from "../../helpers/http-helper";
import { ValidationComposite } from "../../helpers/validators/validation-composite";
import { HttpRequest, HttpResponse } from "../../protocols";

export class UpdateTryoutController  {
  
  constructor (private readonly tryout: UpdateTryout, private readonly validation: ValidationComposite) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const errorParams = this.validation.validateParams(httpRequest.params)
      const error = this.validation.validate(httpRequest.body)
      if (errorParams) {
        return notFound()
      }else if (error) {
        return badRequest(error)
      }
      const update = await this.tryout.update(httpRequest.body)
      return noContent()
    } catch (error) {
      console.error(error)
      return serverError(error)
    }   
  }
}