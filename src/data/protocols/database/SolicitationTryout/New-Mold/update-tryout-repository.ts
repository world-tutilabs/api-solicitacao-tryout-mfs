import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";
import { UpdateTryoutModel } from "../../../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout";

export interface UpdateTryoutRepository{
  update (tryout: UpdateTryoutModel): Promise<ISolicitationTryoutDTO>
}