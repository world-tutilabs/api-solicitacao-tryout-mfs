import { ISolicitationTryout } from "../../models/ISolicitationTryout"
import { TryoutModel } from "../../models/tryout"

export interface IListTryout{
  list (): Promise<ISolicitationTryout[]>
}