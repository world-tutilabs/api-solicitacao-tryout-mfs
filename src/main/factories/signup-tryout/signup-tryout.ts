
import { DbAddTryout } from '../../../data/usecases/add-tryout/db-add-tryout'
import { TryoutMysqlRepository } from '../../../infra/db/mysql/tryOut/tryout-mysql-repository'
import {SignUpTryoutController} from '../../../presentation/controllers/signup-tryout/signUpTryout'
import { Controller } from '../../../presentation/protocols'
import { makeSignUpTryoutValidation } from './signup-tryout-validation'

export const makeSignUpTryoutController = (): Controller => {
  const AddSignUpMysqlRepository = new TryoutMysqlRepository()
  const dbAddTryout = new DbAddTryout(AddSignUpMysqlRepository)
  const sinUpTryout = new SignUpTryoutController(dbAddTryout, makeSignUpTryoutValidation())
  return sinUpTryout
} 