import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";

export interface IFindByRequestTryoutRepository{
  
    findByRequestTryoutRepository(id: string): Promise<IHomologateTryoutDTO>
   
}