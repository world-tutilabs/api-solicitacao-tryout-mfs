import { DbUpdateTryoutRepository } from "../../../data/usecases/update-tryout/db-update-tryout";
import { UpdateTryoutMysqlRepository } from "../../../infra/db/mysql/tryOut/update";
import { UpdateTryoutController } from "../../../presentation/controllers/update-tryout/updateTrayout";
import { Controller } from "../../../presentation/protocols";

// export const makeUpdateTryoutController = (): Controller => {
//   const updateTryoutMysqlRepository = new UpdateTryoutMysqlRepository()
//   const DbUpdateTryout = new DbUpdateTryoutRepository(updateTryoutMysqlRepository)
//   const updateTryoutController = new UpdateTryoutController(DbUpdateTryout)
//   return updateTryoutController
// }