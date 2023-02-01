import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO";

export interface IListTryout {
  list (limit?: number, offset?: number, status?: number): Promise<ISolicitationTryoutDTO[]>
}