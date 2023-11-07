import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IListByStatusTryoutRepository {
  listByStatus(
    limit?: number,
    offset?: number,
    status?: number,
    molde_familia?: string
  ): Promise<{ all: number; list: ISolicitationTryoutDTO[] }>;
}
