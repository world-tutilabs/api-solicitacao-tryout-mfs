import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { IFindById } from "../../../../domain/useCases/SolicitationTryout/New-Mold/find-by-id";
import { AppError } from "../../../../presentation/errors/AppError";
import { IFindByIdTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/find-by-id-tryout-repository";

export class DbFindByIdTryout implements IFindById {
  constructor(
    private readonly iFindByIdTryoutRepository: IFindByIdTryoutRepository
  ) {}
  async findById(id: string): Promise<ISolicitationTryoutDTO> {
    const result = await this.iFindByIdTryoutRepository.find(id);

    if (!result) {
      throw new AppError("Solicitação não encontrada", 404);
    }
    const newFeedstock =
      result.solicitation.injectionProcess.feedstock.description.split("-");
    const mergeObjectFeedstock = Object.assign(
      {},
      result.solicitation.injectionProcess.feedstock,
      {
        code: newFeedstock[0],
        description: newFeedstock[1],
      }
    );
    const mergeObjectInjectionProccess = Object.assign(
      {},
      result.solicitation.injectionProcess,
      { feedstock: mergeObjectFeedstock }
    );
    const ObjectFinaly = Object.assign({}, result.solicitation, {
      injectionProcess: mergeObjectInjectionProccess,
    });

    return ObjectFinaly;
  }
}
