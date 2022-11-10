import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";

export interface IListTryoutAnalysisPCRepository {

    list(limit?: number, offset?: number): Promise<IHomologateTryoutDTO[]>

}