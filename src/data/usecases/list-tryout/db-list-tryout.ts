import { TryoutModel } from "../../../domain/models/tryout";
import { IListTryout } from "../../../domain/usecases/list-tryout/list-tryout";
import { IListTryoutRepository } from "../../protocols/list-tryout-repository";

export class DbListTryout implements IListTryout{
    
    constructor(private readonly listTryoutRepository: IListTryoutRepository){}
    
    list(): Promise<TryoutModel[]> {
       return this.listTryoutRepository.list();
    }

    
}