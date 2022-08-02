import { DbListScheduledTryoutRequest } from "../../../data/useCases/ReportTryout/db-list-scheduled-tryout-request";
import { ReportTryoutMysqlRepository } from "../../../infra/Database/mysql/report-tryout-in-prisma/report-tryout-mysql-repository";
import { ListScheduledTryoutRequestController } from "../../../presentation/controllers/report-tryout-controllers/ListScheduledTryoutRequestController";
import { Controller } from "../../../presentation/protocols";

export const makeListScheduledTryoutRequestController = (): Controller => {
     const reportTryoutMysqlRepository = new ReportTryoutMysqlRepository();
     const dbListScheduledTryoutRequest = new DbListScheduledTryoutRequest(reportTryoutMysqlRepository);
     const index = new ListScheduledTryoutRequestController(dbListScheduledTryoutRequest)
     return index;
}