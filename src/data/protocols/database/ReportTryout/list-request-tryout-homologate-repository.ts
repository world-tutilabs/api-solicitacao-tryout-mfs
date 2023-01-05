import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";

export interface IListRequestTryoutHomologateRepository{
  
    listRequestTryoutHomologate(): Promise<IHomologateTryoutDTO[]>
   
}