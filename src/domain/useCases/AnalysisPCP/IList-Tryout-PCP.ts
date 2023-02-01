import { IHomologateTryoutDTO } from "../../models/IHomologateTryoutDTO";


export interface IListTryoutPCP { 

    listAnalysisPCP(limit?: number, offset?: number): Promise<IHomologateTryoutDTO[]>
}