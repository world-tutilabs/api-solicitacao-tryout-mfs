import { DbListTryout } from "../../../data/usecases/list-tryout/db-list-tryout";
import { ListTryoutMysqlRepository } from "../../../infra/db/mysql/tryout-repository/list";
import { ListTryoutController } from "../../../presentation/controllers/list-tryout/ListTryoutController";
import { Controller } from "../../../presentation/protocols";

export const makeListTryoutController = (): Controller => {
    const listTryoutMysqlRepository = new ListTryoutMysqlRepository();
    const dbListTryout = new DbListTryout(listTryoutMysqlRepository)
    const listTryoutController = new ListTryoutController(dbListTryout);
    return listTryoutController;
}