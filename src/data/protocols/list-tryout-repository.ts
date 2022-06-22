import { ISolicitationTryout } from "../../domain/models/ISolicitationTryout";

export interface IListTryoutRepository {
   list(): Promise<ISolicitationTryout[]>
}