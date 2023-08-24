import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IListByReasonTryoutRepository {
  listByReason(
    limit?: number,
    offset?: number,
    status?: number
  ): Promise<{ all: number; list: ISolicitationTryoutDTO[] }>;
}
