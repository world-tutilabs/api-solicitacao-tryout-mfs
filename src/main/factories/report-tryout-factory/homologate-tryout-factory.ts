// import { MailtrapMailProvider } from "../../../data/protocols/providers/implementations/MailtrapMailProvider";
import { DbHomologationTryoutPCP } from "../../../data/useCases/AnalysisPCP/db-homologation-tryout-pcp";
import { DbHomologateReportTryout } from "../../../data/useCases/ReportTryout/db-homologate-report-tryout";
import { AnalysisPCPMysqlRepository } from "../../../infra/Database/mysql/pcp-analysis-repository-in-prisma/pcp-analysis-mysql-repository";
import { ReportTryoutMysqlRepository } from "../../../infra/Database/mysql/report-tryout-in-prisma/report-tryout-mysql-repository";
import { ReportTryoutHomologationController } from "../../../presentation/controllers/report-tryout-controllers/ReportTryoutHomologationController";
import { Controller } from "../../../presentation/protocols";

export const makeEndingTryoutRequestController = (): Controller => {
  const reportTryoutMysqlRepository = new ReportTryoutMysqlRepository();
  const analysisPCPMysqlRepository = new AnalysisPCPMysqlRepository();
  const dbHomologateReportTryout = new DbHomologateReportTryout(
    analysisPCPMysqlRepository,
    reportTryoutMysqlRepository,
    analysisPCPMysqlRepository
  );
  const index = new ReportTryoutHomologationController(
    dbHomologateReportTryout
  );
  return index;
};
