import { IHomologateTryoutDTO } from "../../models/IHomologateTryoutDTO";

export interface IListScheduledTryoutRequest {
    listScheduledTryoutRequest(): Promise<IHomologateTryoutDTO[]> 
}