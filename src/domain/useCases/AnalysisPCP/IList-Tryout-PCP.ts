import { ISolicitationTryoutDTO } from "../../models/ISolicitationTryoutDTO";

export interface IListTryoutPCP { 

    listAnalysisPCP(): Promise<ISolicitationTryoutDTO[]>
}