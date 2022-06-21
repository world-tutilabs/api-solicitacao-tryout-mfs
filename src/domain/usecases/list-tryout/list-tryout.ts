import { TryoutModel } from "../../models/tryout"

export interface IListTryout{
  list (): Promise<TryoutModel[]>
}