import { off } from "process";
import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IListTryout } from "../../../../domain/useCases/SolicitationTryout/New-Mold/list-tryout";
import { IListTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/listByStatus-tryout-repository";

export class DbListTryout implements IListTryout {
  constructor(private readonly listTryoutRepository: IListTryoutRepository) {}

  async list(
    limit?: number,
    offset?: number,
    status?: number,
    reason?: number,
    molde_familia?: string
  ): Promise<{ all: number; result: ISolicitationTryoutDTO[] }> {
    const tryout = await this.listTryoutRepository.list(
      limit,
      offset,
      status,
      reason,
      molde_familia
    );

    return tryout;
  }
}
