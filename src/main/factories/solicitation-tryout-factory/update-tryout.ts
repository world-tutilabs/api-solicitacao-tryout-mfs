import { DbUpdateTryoutRepository } from "../../../data/useCases/SolicitationTryout/New-Mold/db-update-tryout"
import { TryoutMysqlRepository } from "../../../infra/db/mysql/tryout-repository-prisma/tryout-mysql-repository"
import { UpdateTryoutController } from "../../../presentation/controllers/tryout-controllers/updateTrayout"
import { Controller } from "../../../presentation/protocols"

export const makeUpdateTryoutController = (): Controller => {
  const updateTryoutMysqlRepository = new TryoutMysqlRepository()
  const DbUpdateTryout = new DbUpdateTryoutRepository(updateTryoutMysqlRepository)
  const updateTryoutController = new UpdateTryoutController(DbUpdateTryout)
  return updateTryoutController
}