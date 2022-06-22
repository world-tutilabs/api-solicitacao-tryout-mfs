import { TryoutModel } from "../../../../../domain/models/tryout";
import { UpdateTryoutModel } from "../../../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout";

export interface UpdateTryoutRepository{
  update (tryout: UpdateTryoutModel): Promise<TryoutModel>
}