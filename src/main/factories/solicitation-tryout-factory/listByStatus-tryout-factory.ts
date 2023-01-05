

import { DbListTryout } from "../../../data/useCases/SolicitationTryout/New-Mold/db-list-tryout";
import { DbListByStatusTryout } from "../../../data/useCases/SolicitationTryout/New-Mold/db-listByStatus-tryout";
import { TryoutMysqlRepository } from "../../../infra/Database/mysql/tryout-repository-prisma/tryout-mysql-repository";
import { ListByStatusTryoutController } from "../../../presentation/controllers/tryout-controllers/ListByStatus-Tryout-Controller";
import { Controller } from "../../../presentation/protocols";

export const makeListByStatusTryoutController = (): Controller => {
    const listByStatusTryoutMysqlRepository = new TryoutMysqlRepository();
    const dbListByStatusTryout = new DbListByStatusTryout(listByStatusTryoutMysqlRepository)
    const listTryoutController = new ListByStatusTryoutController(dbListByStatusTryout);
    return listTryoutController;
}