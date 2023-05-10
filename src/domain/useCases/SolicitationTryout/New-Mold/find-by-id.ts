import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO";

export interface IFindById {
  findById(id: string): Promise<ISolicitationTryoutDTO>;
}
