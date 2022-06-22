import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IListTryoutRepository {
   list(): Promise<ISolicitationTryoutDTO[]>
}