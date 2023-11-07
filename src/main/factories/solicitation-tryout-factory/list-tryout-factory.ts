import { DbListTryout } from "../../../data/useCases/SolicitationTryout/New-Mold/db-list-tryout";
import { TryoutMysqlRepository } from "../../../infra/Database/mysql/tryout-repository-prisma/tryout-mysql-repository";
import { ListTryoutController } from "../../../presentation/controllers/tryout-controllers/List-Tryout-Controller";
import { Controller } from "../../../presentation/protocols";

export const makeListTryoutController = (): Controller => {
  const listTryoutMysqlRepository = new TryoutMysqlRepository();
  const dbListTryout = new DbListTryout(listTryoutMysqlRepository);
  const listTryoutController = new ListTryoutController(dbListTryout);
  return listTryoutController;
};
