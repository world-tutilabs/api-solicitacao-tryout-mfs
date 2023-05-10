import { DbFindByIdTryout } from "../../../data/useCases/SolicitationTryout/New-Mold/db-find-by-id-tryout";
import { TryoutMysqlRepository } from "../../../infra/Database/mysql/tryout-repository-prisma/tryout-mysql-repository";
import { FindByIdTryoutController } from "../../../presentation/controllers/tryout-controllers/Find-By-id-Tryout-Controller";
import { Controller } from "../../../presentation/protocols";

export const makeFindByIdTryoutController = (): Controller => {
  const FindByIdTryoutMysqlRepository = new TryoutMysqlRepository();
  const dbFindByIdTryout = new DbFindByIdTryout(FindByIdTryoutMysqlRepository);
  const findByIdTryoutController = new FindByIdTryoutController(
    dbFindByIdTryout
  );
  return findByIdTryoutController;
};
