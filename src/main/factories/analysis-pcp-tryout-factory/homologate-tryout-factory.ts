import { MailtrapMailProvider } from "../../../data/protocols/providers/implementations/MailtrapMailProvider";
import { DbHomologationTryoutPCP } from "../../../data/useCases/AnalysisPCP/db-homologation-tryout-pcp";
import { AnalysisPCPMysqlRepository } from "../../../infra/db/mysql/pcp-analysis-repository-in-prisma/pcp-analysis-mysql-repository";
import { HomologationTryoutPCPController } from "../../../presentation/controllers/pcp-analysis-controllers/HomologationTryoutPCPController";
import { Controller } from "../../../presentation/protocols";

export const makeHomologateTryoutController = (): Controller => {
     const mailtrapMailProvider = new MailtrapMailProvider();
     const analysisPCPMysqlRepository = new AnalysisPCPMysqlRepository();
     const dbHomologationTryoutPCP = new DbHomologationTryoutPCP(mailtrapMailProvider, analysisPCPMysqlRepository,analysisPCPMysqlRepository);
     const homologationTryoutPCPController = new HomologationTryoutPCPController(dbHomologationTryoutPCP);
     return homologationTryoutPCPController;
}