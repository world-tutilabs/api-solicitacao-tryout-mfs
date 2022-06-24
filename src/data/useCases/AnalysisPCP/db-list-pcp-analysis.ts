import { ISolicitationTryoutDTO } from "../../../domain/models/ISolicitationTryoutDTO";
import { IListTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IList-Tryout-PCP";
import { IListTryoutAnalysisPCRepository } from "../../protocols/db/AnalysisPCP/list-pcp-analysis-repository";

export class DbListAnalisysPCP implements IListTryoutPCP{
    constructor(
        private readonly listTryoutAnalysisPCRepository: IListTryoutAnalysisPCRepository,
    ){}
    listAnalysisPCP(): Promise<ISolicitationTryoutDTO[]> {
       
       return this.listTryoutAnalysisPCRepository.list();
    }


}