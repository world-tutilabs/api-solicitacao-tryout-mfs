import { IHomologateTryoutDTO } from "../../../domain/models/IHomologateTryoutDTO";
import { IListTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IList-Tryout-PCP";
import { IListTryoutAnalysisPCRepository } from "../../protocols/db/AnalysisPCP/list-pcp-analysis-repository";

export class DbListAnalisysPCP implements IListTryoutPCP{
    constructor(
        private readonly listTryoutAnalysisPCRepository: IListTryoutAnalysisPCRepository,
    ){}
    listAnalysisPCP(): Promise<IHomologateTryoutDTO[]> {
       
       return this.listTryoutAnalysisPCRepository.list();
    }


}