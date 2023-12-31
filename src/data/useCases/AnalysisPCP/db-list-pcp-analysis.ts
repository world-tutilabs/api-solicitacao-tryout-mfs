import { IHomologateTryoutDTO } from "../../../domain/models/IHomologateTryoutDTO";
import { IListTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IList-Tryout-PCP";
import { AppError } from "../../../presentation/errors/AppError";
import { IListTryoutAnalysisPCRepository } from "../../protocols/database/AnalysisPCP/list-pcp-analysis-repository";

export class DbListAnalisysPCP implements IListTryoutPCP{
    constructor(
        private readonly listTryoutAnalysisPCRepository: IListTryoutAnalysisPCRepository,
    ){}
    listAnalysisPCP(limit?: number, offset?: number): Promise<IHomologateTryoutDTO[]> {
       return this.listTryoutAnalysisPCRepository.list(limit, offset);
    }


}