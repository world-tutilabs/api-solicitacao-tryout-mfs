import { TryoutModel } from "../../../domain/models/tryout";
import { AddTryout, AddTryoutModel } from "../../../domain/usecases/SolicitationTryout/add-tryout";
import { AddTryoutRepository } from "../../protocols/add-tryout-repository";

export class DbAddTryout implements AddTryout{
  private readonly addTryoutRepository: AddTryoutRepository
 constructor(addTryoutRepository: AddTryout){
   this.addTryoutRepository = addTryoutRepository
 }
  async add (tryout: AddTryoutModel): Promise<TryoutModel> {
    const save = this.addTryoutRepository.add(tryout)
    return save
  }
}