import dayjs from "dayjs";
import { IFindByRequestTryoutRepository } from "../../../../data/protocols/database/ReportTryout/find-by-request-tryout-repository";
import { IListRequestTryoutHomologateRepository } from "../../../../data/protocols/database/ReportTryout/list-request-tryout-homologate-repository";
import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";

import { PrismaHelper } from "../helpers/prisma-helper";

export class ReportTryoutMysqlRepository
  implements
    IFindByRequestTryoutRepository,
    IListRequestTryoutHomologateRepository
{
  async findByRequestTryoutRepository(
    id: string
  ): Promise<IHomologateTryoutDTO> {
    const data = await PrismaHelper.prisma.homologation.findFirst({
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
                feedstock: true,
                machine: true,
                labor: true,
                tryout: true,
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
        status: {
          OR: [{ id: 1 }, { id: 5 }],
        },
        // solicitation:{
        //     programmed_date:{
        //         gte: new Date(dayjs().format('YYYY-MM-DD'))
        //     }
        // }
      },
    });

    const newFeedstock =
      data.solicitation.injectionProcess.feedstock.description.split("-");
    const mergeObjectFeedstock = Object.assign(
      {},
      data.solicitation.injectionProcess.feedstock,
      {
        code: newFeedstock[0],
        description: newFeedstock[1],
      }
    );
    const mergeObjectInjectionProccess = Object.assign(
      {},
      data.solicitation.injectionProcess,
      { feedstock: mergeObjectFeedstock }
    );
    const mergeObjectSolicitation = Object.assign({}, data.solicitation, {
      injectionProcess: mergeObjectInjectionProccess,
    });
    const ObjectFinaly = Object.assign({}, data, {
      solicitation: mergeObjectSolicitation,
    });
    return ObjectFinaly;
  }
  async listRequestTryoutHomologate(): Promise<IHomologateTryoutDTO[]> {
    const data = await PrismaHelper.prisma.homologation.findMany({
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
        status: {
          id: 1,
        },
        solicitation: {
          programmed_date: {
            //            gte: new Date(dayjs().format("YYYY-MM-DD")),
          },
        },
      },
    });

    return data;
  }
}
