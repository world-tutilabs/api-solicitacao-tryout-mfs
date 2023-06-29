import { off } from "process";
import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IListTryout } from "../../../../domain/useCases/SolicitationTryout/New-Mold/list-tryout";
import { AppError } from "../../../../presentation/errors/AppError";
import { IListTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/listByStatus-tryout-repository";

export class DbListTryout implements IListTryout{
    
    constructor(private readonly listTryoutRepository: IListTryoutRepository){}

    async list(limit?: number, offset?: number, status?: number): Promise<{ quantity: number; tryout: ISolicitationTryoutDTO[]}> {
        const quantity = await this.listTryoutRepository.countQuantity()
        const tryout = await this.listTryoutRepository.list(limit,offset,status)

        return {quantity, tryout}
    }

    
}