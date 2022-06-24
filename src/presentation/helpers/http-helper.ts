import {ServerError} from '../errors/server-error'
import { UnauthorizedError } from '../errors/unauthorized-error'
import {HttpResponse} from '../protocols' 
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
export const unauthorized  = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})


