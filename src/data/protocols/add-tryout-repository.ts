import { TryoutModel } from "../../domain/models/tryout";
import { AddTryoutModel } from "../../domain/usecases/SolicitationTryout/add-tryout";

export interface AddTryoutRepository {
  add (tryout: AddTryoutModel): Promise<TryoutModel>
}