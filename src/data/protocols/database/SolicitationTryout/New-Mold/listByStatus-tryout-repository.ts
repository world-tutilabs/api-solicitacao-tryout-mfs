import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IListTryoutRepository {
  list(
    limit?: number,
    offset?: number,
    status?: number,
    reason?: number
  ): Promise<{ all: number; result: ISolicitationTryoutDTO[] }>;
}
