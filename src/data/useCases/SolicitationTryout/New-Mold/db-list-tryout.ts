import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IListTryout } from "../../../../domain/useCases/SolicitationTryout/New-Mold/list-tryout";
import { AppError } from "../../../../presentation/errors/AppError";
import { IListTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/list-tryout-repository";

export class DbListTryout implements IListTryout{
    
    constructor(private readonly listTryoutRepository: IListTryoutRepository){}
    
    list(): Promise<ISolicitationTryoutDTO[]> {
       return this.listTryoutRepository.list();
    }

    
}