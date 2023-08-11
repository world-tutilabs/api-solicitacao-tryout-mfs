import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IListByStatus } from "../../../../domain/useCases/SolicitationTryout/New-Mold/listByStatus-tryout";
import { AppError } from "../../../../presentation/errors/AppError";
import { IListByStatusTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/list-tryout-repository";

export class DbListByStatusTryout implements IListByStatus {
  constructor(
    private readonly listByStatusTryoutRepository: IListByStatusTryoutRepository
  ) {}

  listByStatus(
    status: number,
    limit?: number,
    offset?: number
  ): Promise<{ all: number; list: ISolicitationTryoutDTO[] }> {
    if (!status) {
      throw new AppError("Status é obrigatório", 400);
    }
    return this.listByStatusTryoutRepository.listByStatus(
      limit,
      offset,
      status
    );
  }
}
