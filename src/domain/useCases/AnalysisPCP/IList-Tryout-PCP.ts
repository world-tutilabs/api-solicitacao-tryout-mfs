import { IHomologateTryoutDTO } from "../../models/IHomologateTryoutDTO";


export interface IListTryoutPCP { 

    listAnalysisPCP(): Promise<IHomologateTryoutDTO[]>
}