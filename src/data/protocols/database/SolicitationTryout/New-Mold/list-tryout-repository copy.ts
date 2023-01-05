import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IListByStatusTryoutRepository {
   listByStatus(limit?: number, offset?: number, status?: number): Promise<{all: number, list: ISolicitationTryoutDTO[]}>
}


