import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IFindById } from "../../../../domain/useCases/SolicitationTryout/New-Mold/find-by-id";
import { IFindByIdTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/find-by-id-tryout-repository";

export class DbFindByIdTryout implements IFindById {
  constructor(
    private readonly iFindByIdTryoutRepository: IFindByIdTryoutRepository
  ) {}
  async findById(id: string): Promise<ISolicitationTryoutDTO> {
    return await this.iFindByIdTryoutRepository.find(id);
  }
}
