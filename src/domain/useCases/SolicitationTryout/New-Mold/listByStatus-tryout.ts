import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO";

export interface IListByStatus {
  listByStatus(
    status: number,
    limit?: number,
    offset?: number,
  ): Promise<{ all: number; list: ISolicitationTryoutDTO[] }>;
}
