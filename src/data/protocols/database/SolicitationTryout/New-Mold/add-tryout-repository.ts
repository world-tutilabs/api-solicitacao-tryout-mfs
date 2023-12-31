import { ISolicitationTryoutDTO } from "../../../../../domain/models/ISolicitationTryoutDTO";
import { AddTryoutModel } from "../../../../../domain/useCases/SolicitationTryout/New-Mold/add-tryout";

export interface AddTryoutRepository {
  add (tryout: AddTryoutModel): Promise<ISolicitationTryoutDTO>
}