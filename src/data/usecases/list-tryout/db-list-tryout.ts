import { ISolicitationTryout } from "../../../domain/models/ISolicitationTryout";
import { TryoutModel } from "../../../domain/models/tryout";
import { IListTryout } from "../../../domain/useCases/list-tryout/list-tryout";
import { IListTryoutRepository } from "../../protocols/list-tryout-repository";

export class DbListTryout implements IListTryout{
    
    constructor(private readonly listTryoutRepository: IListTryoutRepository){}
    
    list(): Promise<ISolicitationTryout[]> {
       return this.listTryoutRepository.list();
    }

    
}