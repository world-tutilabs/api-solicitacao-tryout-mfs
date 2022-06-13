
import { DbAddTryout } from '../../../data/usecases/add-tryout/db-add-tryout'
import { AddTryoutMysqlRepository } from '../../../infra/db/mysql/tryout-repository/add'
import {SignUpTryoutController} from '../../../presentation/controllers/signup-tryout/signUpTryout'
import { Controller } from '../../../presentation/protocols'
import { makeSignUpTryoutValidation } from './signup-tryout-validation'

export const makeSignUpTryoutController = (): Controller => {
  const AddSignUpMysqlRepository = new AddTryoutMysqlRepository()
  const dbAddTryout = new DbAddTryout(AddSignUpMysqlRepository)
  const sinUpTryout = new SignUpTryoutController(dbAddTryout, makeSignUpTryoutValidation())
  return sinUpTryout
} 