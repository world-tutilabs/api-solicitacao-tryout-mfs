import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IListTryout } from "../../../../domain/useCases/SolicitationTryout/New-Mold/list-tryout";
import { IListByStatus } from "../../../../domain/useCases/SolicitationTryout/New-Mold/listByStatus-tryout";
import { AppError } from "../../../../presentation/errors/AppError";
import { IListByStatusTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/list-tryout-repository copy";
import { IListTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/listByStatus-tryout-repository";

export class DbListByStatusTryout implements IListByStatus{
    
    constructor(private readonly listByStatusTryoutRepository: IListByStatusTryoutRepository){}
    
    listByStatus(limit?: number, offset?: number, status?: number): Promise<{all: number, list: ISolicitationTryoutDTO[]}> {

        
        return this.listByStatusTryoutRepository.listByStatus(limit,offset, status);
    }
    


    
}