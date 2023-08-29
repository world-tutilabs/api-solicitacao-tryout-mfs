import { IFindByHomologateTryoutPCPRepository } from "../../../../data/protocols/database/AnalysisPCP/find-by-homologate-tryout-pcp-repository";
import { IHomologationRepositoryInRepository } from "../../../../data/protocols/database/AnalysisPCP/homologate-pcp-repository";
import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";
import { IHomologate } from "../../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { AppError } from "../../../../presentation/errors/AppError";
import { PrismaHelper } from "../helpers/prisma-helper";

export class AnalysisPCPMysqlRepository
  implements
    IHomologationRepositoryInRepository,
    IFindByHomologateTryoutPCPRepository
{
  async homologate({
    id,
    status,
    userHomologate,
    comment,
  }: IHomologate): Promise<IHomologateTryoutDTO> {
    try {
      const data = await PrismaHelper.prisma.homologation
        .update({
          data: {
            fk_homologation_status: status,
            homologation_user: userHomologate,
            homologation_at: new Date(),
            comment,
          },
          where: {
            id,
          },
        })
        .then(async () => {
          const homologate = await this.findByHomologateTryout(id);

          return homologate;
        })
        .then(async (homologate) => {
          if (status === 4) {
            // await fetchData(homologate.solicitation.injectionProcess.mold); //TODO:
          }
          return homologate;
        });

      return data;
    } catch (error) {
      throw new AppError("Erro ao conectar com banco de dados", 500);
    }
  }

  async findByHomologateTryout(id: string): Promise<IHomologateTryoutDTO> {
    const tryout = await PrismaHelper.prisma.homologation.findFirst({
      select: {
        id: true,
        fk_solicitation: true,
        solicitation: {
          select: {
            id: true,
            number_tryout: true,
            code_sap: true,
            desc_product: true,
            client: true,
            programmed_date: true,
            code: true,
            reason: true,
            injectionProcess: {
              select: {
                id: true,
                id_tryout: true,
                proc_technician: true,
                quantity: true,
                mold: true,
              },
            },
          },
        },
        created_user: true,
        created_at: true,
        homologation_user: true,
        homologation_at: true,
        comment: true,
        status: true,
      },
      where: {
        id,
      },
    });
    return tryout;
  }
}
