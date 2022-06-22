import { TryoutModel } from "../../../../domain/models/tryout"
import { AddTryout, AddTryoutModel } from "../../../../domain/useCases/SolicitationTryout/New-Mold/add-tryout"
import { AddTryoutRepository } from "../../../protocols/db/SolicitationTryout/New-Mold/add-tryout-repository"

export class DbAddTryout implements AddTryout{
 
 constructor( private readonly addTryoutRepository: AddTryoutRepository){}
 
  async add (tryout: AddTryoutModel): Promise<TryoutModel> {
    const save = await this.addTryoutRepository.add(tryout)
    return save
  }
}