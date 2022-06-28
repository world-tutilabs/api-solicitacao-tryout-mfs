import { IHomologate } from "../../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";

export interface IHomologationRepositoryInRepository {

    homologate(data: IHomologate):Promise <IHomologate>

}