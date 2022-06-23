import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO"
import { UpdateTryout } from "../../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout"
import { UpdateTryoutRepository } from "../../../protocols/db/SolicitationTryout/New-Mold/update-tryout-repository"

export class DbUpdateTryoutRepository implements UpdateTryout {
  private readonly updateTryoutRepository: UpdateTryoutRepository
  constructor (updateTryoutRepository: UpdateTryoutRepository) {
    this.updateTryoutRepository = updateTryoutRepository
  }
  update(tryout: any): Promise<ISolicitationTryoutDTO> {
    // const update = this.updateTryoutRepository.update(tryout)
    return null
  }
}