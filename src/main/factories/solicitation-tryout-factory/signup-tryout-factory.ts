import { DbAddTryout } from "../../../data/useCases/SolicitationTryout/New-Mold/db-add-tryout"
import { TryoutMysqlRepository } from "../../../infra/db/mysql/tryout-repository-prisma/tryout-mysql-repository"
import { SignUpTryoutController } from "../../../presentation/controllers/tryout-controllers/signUpTryout"
import { Controller } from "../../../presentation/protocols"
import { makeSignUpTryoutValidation } from "./validations/signup-tryout-validation-factory"


export const makeSignUpTryoutController = (): Controller => {
  const AddSignUpMysqlRepository = new TryoutMysqlRepository()
  const dbAddTryout = new DbAddTryout(AddSignUpMysqlRepository)
  const sinUpTryout = new SignUpTryoutController(dbAddTryout, makeSignUpTryoutValidation())
  return sinUpTryout
} 