import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";

export interface IListTryoutAnalysisPCRepository {

list(): Promise<ISolicitationTryoutDTO[]>

}