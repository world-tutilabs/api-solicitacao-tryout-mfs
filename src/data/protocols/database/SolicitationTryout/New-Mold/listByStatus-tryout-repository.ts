import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IListTryoutRepository {
   list(limit?: number, offset?: number, status?: number): Promise<ISolicitationTryoutDTO[]>
}


