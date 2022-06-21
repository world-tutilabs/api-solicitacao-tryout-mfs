import { TryoutModel } from "../../domain/models/tryout";

export interface IListTryoutRepository {
   list(): Promise<TryoutModel[]>
}