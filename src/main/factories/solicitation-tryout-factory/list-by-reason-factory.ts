import { DbListByReasonTryout } from "../../../data/useCases/SolicitationTryout/New-Mold/db-list-by-reason-tryout";
import { TryoutMysqlRepository } from "../../../infra/Database/mysql/tryout-repository-prisma/tryout-mysql-repository";
import { ListByReasonTryoutController } from "../../../presentation/controllers/tryout-controllers/ListByReasonTryout";
import { Controller } from "../../../presentation/protocols";

export const makeListByReasonTryoutController = (): Controller => {
  const tryoutMysqlRepository = new TryoutMysqlRepository();
  const dbListByReasonTryout = new DbListByReasonTryout(tryoutMysqlRepository);
  const listByReasonTryoutController = new ListByReasonTryoutController(
    dbListByReasonTryout
  );
  return listByReasonTryoutController;
};
