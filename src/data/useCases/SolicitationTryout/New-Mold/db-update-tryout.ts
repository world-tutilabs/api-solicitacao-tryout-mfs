import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO"
import { UpdateTryout, UpdateTryoutModel } from "../../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout"
import { UpdateTryoutRepository } from "../../../protocols/db/SolicitationTryout/New-Mold/update-tryout-repository"

export class DbUpdateTryoutRepository implements UpdateTryout {
  constructor (private readonly updateTryoutRepository: UpdateTryoutRepository) {
  }
  update(tryoutData: UpdateTryoutModel): Promise<ISolicitationTryoutDTO> {
    const update = this.updateTryoutRepository.update(tryoutData)
    return update
  }
}