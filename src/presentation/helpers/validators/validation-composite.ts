import { PrismaHelper } from '../../../infra/Database/mysql/helpers/prisma-helper'
import { TryoutMysqlRepository } from '../../../infra/Database/mysql/tryout-repository-prisma/tryout-mysql-repository'
import { Validation } from './validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}
  async validateParams (input: any): Promise<Error> {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
