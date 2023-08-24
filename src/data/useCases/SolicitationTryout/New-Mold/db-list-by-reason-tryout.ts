import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IListByReasonTryout } from "../../../../domain/useCases/SolicitationTryout/New-Mold/list-by-reason-tryout";
import { AppError } from "../../../../presentation/errors/AppError";
import { IListByReasonTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/list-by-reason-tryout";

export class DbListByReasonTryout implements IListByReasonTryout {
  constructor(
    private readonly listByReasonTryoutRepository: IListByReasonTryoutRepository
  ) {}

  listByReason(
    limit?: number,
    offset?: number
  ): Promise<{ all: number; list: ISolicitationTryoutDTO[] }> {
    return this.listByReasonTryoutRepository.listByReason(limit, offset);
  }
}
