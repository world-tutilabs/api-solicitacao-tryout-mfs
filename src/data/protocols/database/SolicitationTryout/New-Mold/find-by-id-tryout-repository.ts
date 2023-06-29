import { IHomologateTryoutDTO } from "../../../../../domain/models/IHomologateTryoutDTO";

export interface IFindByIdTryoutRepository {
  find(id: string): Promise<IHomologateTryoutDTO>;
}
