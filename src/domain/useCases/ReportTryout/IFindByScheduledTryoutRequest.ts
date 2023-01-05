import { IHomologateTryoutDTO } from "../../models/IHomologateTryoutDTO";

export interface IFindByScheduledTryoutRequest {
    findByScheduledTryoutRequest(id: string): Promise<IHomologateTryoutDTO> 
}