import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";

export interface IListTryoutAnalysisPCRepository {

    list(): Promise<IHomologateTryoutDTO[]>

}