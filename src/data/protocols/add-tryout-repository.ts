import { TryoutModel } from "../../domain/models/tryout";
import { AddTryoutModel } from "../../domain/usecases/signup-tryout/add-tryout";

export interface AddTryoutRepository {
  add (tryout: AddTryoutModel): Promise<TryoutModel>
}