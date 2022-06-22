import { TryoutModel } from "../../domain/models/tryout";
import { UpdateTryoutModel } from "../../domain/useCases/update-tryout/update-tryout";

export interface UpdateTryoutRepository{
  update (tryout: UpdateTryoutModel): Promise<TryoutModel>
}