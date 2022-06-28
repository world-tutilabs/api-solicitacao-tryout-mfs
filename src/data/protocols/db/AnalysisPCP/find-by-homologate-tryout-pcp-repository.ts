import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";

export interface IFindByHomologateTryoutPCPRepository{
  
    findByHomologateTryout(id: string): Promise<IHomologateTryoutDTO>
   
}