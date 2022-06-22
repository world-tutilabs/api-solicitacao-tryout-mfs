import { AddTryout } from '../../../domain/usecases/tryout/add-tryout'
import {badRequest, ok, serverError} from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class SignUpTryoutController implements Controller {  
  private readonly addTryout: AddTryout
  private readonly validation: Validation
  constructor(addTryout: AddTryout, validation: Validation) {
    this.addTryout = addTryout
    this.validation = validation
  }   
  async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
        try {
          const error = this.validation.validate(httpRequest.body)
          if (error) {
            return badRequest(error)
          }
            const tryout = await this.addTryout.add(httpRequest.body)
           return ok(tryout)
        }catch(error) {
            return serverError(error)
        }
    }
}
