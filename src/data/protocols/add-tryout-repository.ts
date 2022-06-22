import { TryoutModel } from "../../domain/models/tryout";
import { AddTryoutModel } from "../../domain/useCases/SolicitationTryout/add-tryout";

export interface AddTryoutRepository {
  add (tryout: AddTryoutModel): Promise<TryoutModel>
}