import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO";

export interface IListByStatus {
  listByStatus (limit?: number, offset?: number, status?: number): Promise<{all: number, list: ISolicitationTryoutDTO[]}>
}