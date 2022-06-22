import { ISolicitationTryout } from "../../domain/models/ISolicitationTryout";
import { TryoutModel } from "../../domain/models/tryout";
import { AddTryoutModel } from "../../domain/usecases/SolicitationTryout/add-tryout";
import { UpdateTryoutModel } from "../../domain/usecases/update-tryout/update-tryout";

export interface AddTryoutRepository {
  add (tryout: AddTryoutModel): Promise<TryoutModel>
  list(): Promise<ISolicitationTryout[]>
  update (tryout: UpdateTryoutModel): Promise<TryoutModel>
}