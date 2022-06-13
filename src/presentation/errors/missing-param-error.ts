export class MissingParamError extends Error {
  constructor (ParamName: string) {
    super(`Missing Param ${ParamName}`)
    this.name = 'MissingParamError'
  }
}
