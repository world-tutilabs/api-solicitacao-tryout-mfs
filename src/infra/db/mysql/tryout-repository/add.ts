import {AddTryoutRepository} from '../../../../data/protocols/add-tryout-repository'
import { TryoutModel } from '../../../../domain/models/tryout';
import { AddTryoutModel } from '../../../../domain/usecases/SolicitationTryout/add-tryout';
import {PrismaHelper} from '../helpers/prisma-helper';

export class AddTryoutMysqlRepository implements AddTryoutRepository{
  async add (tryoutData: AddTryoutModel): Promise<TryoutModel>{ 
    console.log('entrou')
      const result = await PrismaHelper.prisma.solicitationTryout.create({
            data: {
              code_sap: tryoutData.code_sap,
              desc_product: tryoutData.product_description,
              client: tryoutData.client,
              programmed_date: new Date(),
              reason: tryoutData.reason,
              injectionProcess: {
                create: {
                  proc_technician: "rafael almeida",
                  quantity: 10,
                  labor: {
                    create: {
                      description: tryoutData.InjectionProcess.labor.description,
                      amount: tryoutData.InjectionProcess.labor.amount
                    }
                  },
                  mold: {
                    create: {
                      desc_mold: tryoutData.InjectionProcess.mold.mold,
                      number_cavity: tryoutData.InjectionProcess.mold.number_cavity
                    }
                  },
                  feedstock: {
                    create: {
                      code: tryoutData.InjectionProcess.feedstocks.code,
                      description: tryoutData.InjectionProcess.feedstocks.description
                    }
                  }
                }
              }
            }
          })
          console.log(result)
          console.log('entrou')
          // const FindAllTryout = await PrismaHelper.prisma.solicitationTryout.findMany({
          //   where: { id: result.id },
          //   include: {
          //     injection_process: {
          //       include:{
          //         labor: true,
          //         molde: true,
          //         machine: true,
          //         feedstocks: true,
          //         peripheral: true
          //       }
          //     }
          //   }
          // })
          // const mapInjectionProcess = await PrismaHelper.mapInjectionProcess(FindAllTryout)
        return null
    }
  
} 