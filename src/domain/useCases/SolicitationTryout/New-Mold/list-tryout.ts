import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO";

export interface IListTryout {
  list (): Promise<ISolicitationTryoutDTO[]>
}