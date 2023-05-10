import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";

export interface IFindByIdTryoutRepository {
  find(id: string): Promise<ISolicitationTryoutDTO>;
}
