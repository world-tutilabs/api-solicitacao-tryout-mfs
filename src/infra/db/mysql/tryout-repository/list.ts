import { IListTryoutRepository } from "../../../../data/protocols/list-tryout-repository";
import { ISolicitationTryout } from "../../../../domain/models/ISolicitationTryout";
import { TryoutModel } from "../../../../domain/models/tryout";
import { PrismaHelper } from "../helpers/prisma-helper";

export class ListTryoutMysqlRepository implements IListTryoutRepository {
  async list(): Promise<ISolicitationTryout[]> {
    const result = PrismaHelper.prisma.solicitationTryout.findMany({
      select: {
        id: true,
        number_tryout: true,
        code_sap: true,
        desc_product: true,
        client: true,
        programmed_date: true,
        reason: true,
        // homologation: {
        //   select: {
        //    id: true,
        //    fk_solicitation: true,
        //    created_user: true,
        //    created_at: true, 
        //    homologation_user: true,
        //    homologation_at: true,
        //   }
        // },
        injectionProcess: {

          select: {
            id: true,
            id_tryout: true,
            proc_technician: true,
            quantity: true,
            
            feedstock: {
              select:{
                id: true,
                description: true,
                code: true
              }
            },

            labor: {
              select:{
                id: true,
                description: true,
                amount: true,
              }
            },

            mold: {
              select:{
                id: true,
                number_cavity: true,
                desc_mold: true,
              }
            }
          }
        },
      }
    })

    return result;
  }
}
