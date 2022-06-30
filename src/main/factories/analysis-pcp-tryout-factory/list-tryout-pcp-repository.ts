import { DbListAnalisysPCP } from "../../../data/useCases/AnalysisPCP/db-list-pcp-analysis";
import { AnalysisPCPMysqlRepository } from "../../../infra/db/mysql/pcp-analysis-repository-in-prisma/pcp-analysis-mysql-repository";
import { ListTryoutPCPController } from "../../../presentation/controllers/pcp-analysis-controllers/ListTryoutPCPController";
import { Controller } from "../../../presentation/protocols";

export const makeListTryoutPCPController = (): Controller => {
     const analysisPCPMysqlRepository = new AnalysisPCPMysqlRepository();
     const dbListAnalisysPCP = new DbListAnalisysPCP(analysisPCPMysqlRepository);
     const listTryoutPCPController = new ListTryoutPCPController(dbListAnalisysPCP);
     return listTryoutPCPController;
}