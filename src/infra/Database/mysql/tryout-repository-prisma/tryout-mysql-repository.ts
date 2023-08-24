import { AddTryoutRepository } from "../../../../data/protocols/database/SolicitationTryout/New-Mold/add-tryout-repository";
import { IFindByIdTryoutRepository } from "../../../../data/protocols/database/SolicitationTryout/New-Mold/find-by-id-tryout-repository";
import { IListByStatusTryoutRepository } from "../../../../data/protocols/database/SolicitationTryout/New-Mold/list-tryout-repository";
import { IListTryoutRepository } from "../../../../data/protocols/database/SolicitationTryout/New-Mold/listByStatus-tryout-repository";
import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import { AddTryoutModel } from "../../../../domain/useCases/SolicitationTryout/New-Mold/add-tryout";
import { UpdateTryoutModel } from "../../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout";
import { PrismaHelper } from "../helpers/prisma-helper";
import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";
import { realpathSync } from "fs";
import { fetchData } from "../../../../config/rrim/find-by-id";

const homologationStatusId = {
  solAprovada: 1,
  solReprovada: 2,
  analisePCP: 3,
  cancelado: 4,
  relAprovado: 5,
  relReprovado: 6,
};

const reasonId = {
  novoMolde: 1,
  retroativo: 2,
  novoProduto: 3,
  modMolde: 4,
};

export class TryoutMysqlRepository
  implements
    AddTryoutRepository,
    IListTryoutRepository,
    IFindByIdTryoutRepository
{
  async add(tryoutData: AddTryoutModel): Promise<ISolicitationTryoutDTO> {
    const result = await PrismaHelper.prisma.solicitationTryout.create({
      data: {
        code_sap: tryoutData.code_sap,
        desc_product: tryoutData.product_description,
        client: tryoutData.client,
        programmed_date: new Date(tryoutData.date),
        code: tryoutData.code,
        reasonId: tryoutData.reason,
        homologation: {
          create: {
            created_user: {
              nome: tryoutData.user.nome_completo.trim(),
              matricula: tryoutData.user.matricula.trim(),
              role: tryoutData.user.nivel_de_acesso["descricao"].trim(),
              date: new Date().toDateString(),
              email: tryoutData.user.email.trim(),
            },
            created_at: new Date(),
            fk_homologation_status: 3,
          },
        },
        injectionProcess: {
          create: {
            proc_technician: tryoutData.InjectionProcess.proc_technician,
            quantity: tryoutData.InjectionProcess.quantity,
            labor: {
              create: {
                description: tryoutData.InjectionProcess.labor.description,
                amount: tryoutData.InjectionProcess.labor.amount,
              },
            },
            mold: {
              create: {
                desc_mold: tryoutData.InjectionProcess.mold.mold,
                number_cavity: tryoutData.InjectionProcess.mold.number_cavity,
              },
            },
            feedstock: {
              create: {
                kg: tryoutData.InjectionProcess.feedstocks.kg,
                description: tryoutData.InjectionProcess.feedstocks.description,
              },
            },
            machine: {
              create: {
                model: tryoutData.InjectionProcess.machine.model,
              },
            },
          },
        },
      },
    });

    const FindAllTryout = await PrismaHelper.prisma.solicitationTryout.findMany(
      {
        where: {
          id: result.id,
        },
        include: {
          injectionProcess: {
            include: {
              feedstock: true,
              labor: true,
              mold: true,
              machine: true,
            },
          },
        },
      }
    );

    const mapInjectionProcess = await PrismaHelper.mapInjectionProcess(
      FindAllTryout
    );

    // await fetchData(mapInjectionProcess.injectionProcess.mold.desc_mold); //TODO:

    return mapInjectionProcess;
  }

  async list(
    limit?: number,
    offset?: number,
    status?: number,
    reason?: number
  ): Promise<{ all: number; result: ISolicitationTryoutDTO[] }> {
    const reasonWhereClause =
      Number(reason) === 1
        ? [reasonId.novoMolde, reasonId.retroativo]
        : Number(reason) === 2
        ? [reasonId.novoProduto, reasonId.modMolde]
        : Number(reason) === 3
        ? [reasonId.novoProduto]
        : Number(reason) === 4
        ? [reasonId.modMolde]
        : undefined;

    const statusWhereClause = status
      ? { equals: Number(status) }
      : { notIn: homologationStatusId.cancelado };

    const result = await PrismaHelper.prisma.solicitationTryout.findMany({
      select: {
        id: true,
        number_tryout: true,
        code_sap: true,
        desc_product: true,
        client: true,
        programmed_date: true,
        code: true,
        reason: true,
        homologation: {
          select: {
            id: true,
            fk_solicitation: true,
            created_user: true,
            created_at: true,
            homologation_user: true,
            homologation_at: true,
            comment: true,
            status: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
        injectionProcess: {
          select: {
            id: true,
            id_tryout: true,
            proc_technician: true,
            quantity: true,

            feedstock: {
              select: {
                id: true,
                description: true,
                kg: true,
              },
            },

            labor: {
              select: {
                id: true,
                description: true,
                amount: true,
              },
            },

            mold: {
              select: {
                id: true,
                number_cavity: true,
                desc_mold: true,
              },
            },
            machine: {
              select: {
                id: true,
                model: true,
              },
            },
          },
        },
      },

      where: {
        AND: [
          {
            homologation: {
              fk_homologation_status: statusWhereClause,
            },
          },
          {
            reasonId: {
              in: reason ? reasonWhereClause : undefined,
            },
          },
        ],
      },
      orderBy: {
        number_tryout: "desc",
      },
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
    });

    const all = await PrismaHelper.prisma.solicitationTryout.count({
      where: {
        AND: [
          {
            homologation: {
              fk_homologation_status: statusWhereClause,
            },
          },
          {
            reasonId: {
              in: reason ? reasonWhereClause : undefined,
            },
          },
        ],
      },
    });

    return { all, result };
  }

  async update(tryoutData: UpdateTryoutModel): Promise<any> {
    const result = await PrismaHelper.prisma.solicitationTryout.update({
      where: {
        id: tryoutData.id,
      },
      data: {
        code_sap: tryoutData.code_sap,
        desc_product: tryoutData.product_description,
        client: tryoutData.client,
        code: tryoutData.code,
        reasonId: tryoutData.reason,
        programmed_date: new Date(tryoutData.date),
        homologation: {
          update: {
            fk_homologation_status: homologationStatusId.analisePCP,
          },
        },
        injectionProcess: {
          update: {
            proc_technician: tryoutData.InjectionProcess.proc_technician,
            quantity: tryoutData.InjectionProcess.quantity,
            labor: {
              update: {
                amount: tryoutData.InjectionProcess.labor.amount,
                description: tryoutData.InjectionProcess.labor.description,
              },
            },
            mold: {
              update: {
                number_cavity: tryoutData.InjectionProcess.mold.number_cavity,
                desc_mold: tryoutData.InjectionProcess.mold.mold,
              },
            },
            feedstock: {
              update: {
                kg: tryoutData.InjectionProcess.feedstocks.kg,
                description: tryoutData.InjectionProcess.feedstocks.description,
              },
            },
            machine: {
              update: {
                model: tryoutData.InjectionProcess.machine.model,
              },
            },
          },
        },
      },
    });
    return result;
  }
  async find(id: string): Promise<any> {
    const result = await PrismaHelper.prisma.homologation.findUnique({
      include: {
        solicitation: {
          include: {
            injectionProcess: {
              include: {
                feedstock: true,
                machine: true,
              },
            },
          },
        },
      },
      where: {
        fk_solicitation: id,
      },
    });
    return result;
  }
}
