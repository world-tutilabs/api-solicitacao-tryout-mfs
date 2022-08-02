import { DbUpdateTryoutRepository } from "../../../data/useCases/SolicitationTryout/New-Mold/db-update-tryout"
import { TryoutMysqlRepository } from "../../../infra/Database/mysql/tryout-repository-prisma/tryout-mysql-repository"
import { UpdateTryoutController } from "../../../presentation/controllers/tryout-controllers/update-Trayout-Controller"
import { Controller } from "../../../presentation/protocols"
import { makeUpdateTryoutValidation } from "./validations/update-tryout-validation-factory"

export const makeUpdateTryoutController = (): Controller => {
  const updateTryoutMysqlRepository = new TryoutMysqlRepository()
  const DbUpdateTryout = new DbUpdateTryoutRepository(updateTryoutMysqlRepository)
  const updateTryoutController = new UpdateTryoutController(DbUpdateTryout, makeUpdateTryoutValidation())
  return updateTryoutController
}