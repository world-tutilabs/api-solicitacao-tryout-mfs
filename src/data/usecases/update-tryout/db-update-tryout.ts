import { TryoutModel } from "../../../domain/models/tryout";
import { UpdateTryout, UpdateTryoutModel } from "../../../domain/usecases/update-tryout/update-tryout";
import { UpdateTryoutRepository } from "../../protocols/db/tryOut/update-tryout-repository";

export class DbUpdateTryoutRepository implements UpdateTryout {
  private readonly updateTryoutRepository: UpdateTryoutRepository
  constructor (updateTryoutRepository: UpdateTryoutRepository) {
    this.updateTryoutRepository = updateTryoutRepository
  }
  update(tryout: any): Promise<TryoutModel> {
    // const update = this.updateTryoutRepository.update(tryout)
    return null
  }
}