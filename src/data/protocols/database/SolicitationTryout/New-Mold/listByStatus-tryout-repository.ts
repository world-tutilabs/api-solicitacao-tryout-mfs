import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IListTryoutRepository {
  list(
    limit?: number,
    offset?: number,
    status?: number,
    reason?: number,
    molde_familia?: string
  ): Promise<{ all: number; result: ISolicitationTryoutDTO[] }>;
}
