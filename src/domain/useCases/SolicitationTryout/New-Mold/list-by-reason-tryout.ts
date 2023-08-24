import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO";

export interface IListByReasonTryout {
  listByReason(
    limit?: number,
    offset?: number,
    status?: number
  ): Promise<{ all: number; list: ISolicitationTryoutDTO[] }>;
}
