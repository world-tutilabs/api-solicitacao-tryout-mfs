import { MailtrapMailProvider } from "../../../data/protocols/providers/implementations/MailtrapMailProvider";
import { DbHomologationTryoutPCP } from "../../../data/useCases/AnalysisPCP/db-homologation-tryout-pcp";
import { DbFindByScheduledTryoutRequest } from "../../../data/useCases/ReportTryout/db-find-by-scheduled-tryout-request";
import { DbHomologateReportTryout } from "../../../data/useCases/ReportTryout/db-homologate-report-tryout";
import { DbListScheduledTryoutRequest } from "../../../data/useCases/ReportTryout/db-list-scheduled-tryout-request";
import { AnalysisPCPMysqlRepository } from "../../../infra/db/mysql/pcp-analysis-repository-in-prisma/pcp-analysis-mysql-repository";
import { ReportTryoutMysqlRepository } from "../../../infra/db/mysql/report-tryout-in-prisma/report-tryout-mysql-repository";
import { HomologationTryoutPCPController } from "../../../presentation/controllers/pcp-analysis-controllers/HomologationTryoutPCPController";
import { FindByScheduledTryoutRequestController } from "../../../presentation/controllers/report-tryout-controllers/FindByScheduledTryoutRequestController";
import { ListScheduledTryoutRequestController } from "../../../presentation/controllers/report-tryout-controllers/ListScheduledTryoutRequestController";
import { ReportTryoutHomologationController } from "../../../presentation/controllers/report-tryout-controllers/ReportTryoutHomologationController";
import { Controller } from "../../../presentation/protocols";

export const makeFindByScheduledTryoutRequestController = (): Controller => {
     const reportTryoutMysqlRepository = new ReportTryoutMysqlRepository();
     const dbFindByScheduledTryoutRequest = new DbFindByScheduledTryoutRequest(reportTryoutMysqlRepository);
     const index = new FindByScheduledTryoutRequestController(dbFindByScheduledTryoutRequest)
     return index;
}