import { UpdateTryoutRepository } from "../../../../data/protocols/update-tryout-repository";
import { TryoutModel } from "../../../../domain/models/tryout";
import { UpdateTryoutModel } from "../../../../domain/usecases/update-tryout/update-tryout";
import { PrismaHelper } from "../helpers/prisma-helper";

export class UpdateTryoutMysqlRepository implements UpdateTryoutRepository{
  async update(tryoutData: UpdateTryoutModel): Promise<TryoutModel> {
    return null
  }
  //   const result = await PrismaHelper.prisma.solicitationTryout.update({
  //     data: {
  //       code_sap: tryoutData.code_sap,
  //       product_description: tryoutData.product_description,
  //       client: tryoutData.client,
  //       date: new Date(),
  //       reason: tryoutData.reason,
  //       id_status: tryoutData.status,
  //       injection_process: {
  //       create: [{
  //           labor: {
  //             create: [
  //               {
  //                 description: tryoutData.InjectionProcess.labor.description,
  //                 amount: tryoutData.InjectionProcess.labor.amount
  //               }
  //             ] 
  //           },
  //           molde: {
  //             create: [{
  //               number_cavity:tryoutData.InjectionProcess.mold.number_cavity,
  //               mold: tryoutData.InjectionProcess.mold.mold
  //             }]
  //           },
  //           feedstocks: {
  //             create: [
  //               {
  //                 code: tryoutData.InjectionProcess.feedstocks.code,
  //                 description: tryoutData.InjectionProcess.feedstocks.description
  //               }
  //             ]
  //           } ,
  //           machine: {
  //             create: [{
  //               model: tryoutData.InjectionProcess.machine.model
  //             }]
  //           },
  //           peripheral: {
  //             create: [{
  //               peripheral: tryoutData.InjectionProcess.peripherals
  //             }]
  //           }
  //         }]
  //       }
  //     },
  //     where: {
  //       id: 2
  //     }
  //   })
  //   console.log(result)
  //   return null
  // }
}