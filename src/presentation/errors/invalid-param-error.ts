export class InvalidParamError extends Error {
  constructor (ParamName: string) {
    super(`Invalid Param ${ParamName}`)
    this.name = 'InvalidParamError'
  }
}
