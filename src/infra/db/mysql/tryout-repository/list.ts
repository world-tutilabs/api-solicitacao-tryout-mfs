import { IListTryoutRepository } from "../../../../data/protocols/list-tryout-repository";
import { TryoutModel } from "../../../../domain/models/tryout";
import { PrismaHelper } from "../helpers/prisma-helper";

export class ListTryoutMysqlRepository implements IListTryoutRepository {
  async list(): Promise<TryoutModel[]> {
    const result = PrismaHelper.prisma.tryout.findMany({
      select: {
        id: true,
        code_sap: true,
        product_description: true,
        client: true,
        date: true,
        reason: true,
        id_status: true,
        injection_process: {
          select: {
            id: true,
            id_tryout: true,
            labor: true,
            molde: true,
            machine: true,
            feedstocks: true,
            peripheral: true,
          },
        },
      },
    });

    return result;
  }
}
