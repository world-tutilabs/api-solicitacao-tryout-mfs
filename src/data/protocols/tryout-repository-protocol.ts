import { ISolicitationTryout } from "../../domain/models/ISolicitationTryout";
import { TryoutModel } from "../../domain/models/tryout";
import { AddTryoutModel } from "../../domain/useCases/SolicitationTryout/add-tryout";
import { UpdateTryoutModel } from "../../domain/useCases/update-tryout/update-tryout";

export interface TryoutRepository {
  add (tryout: AddTryoutModel): Promise<TryoutModel>
  list(): Promise<ISolicitationTryout[]>
  update (tryout: UpdateTryoutModel): Promise<TryoutModel>
}