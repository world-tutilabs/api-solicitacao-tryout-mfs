import { TryoutModel } from "../../../domain/models/tryout";
import { AddTryout, AddTryoutModel } from "../../../domain/usecases/tryout/add-tryout";
import { AddTryoutRepository } from "../../protocols/db/tryOut/add-tryout-repository";

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