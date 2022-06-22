import {AddTryoutRepository} from '../../../../data/protocols/add-tryout-repository'
import { TryoutModel } from '../../../../domain/models/tryout';
import { AddTryoutModel } from '../../../../domain/usecases/signup-tryout/add-tryout';
import {PrismaHelper} from '../helpers/prisma-helper';

export class AddTryoutMysqlRepository implements AddTryoutRepository{
  async add (tryoutData: AddTryoutModel): Promise<TryoutModel>{ 
      const result = await PrismaHelper.prisma.solicitationTryout.create({
            data: {
              code_sap: tryoutData.code_sap,
              desc_product: tryoutData.product_description,
              client: tryoutData.client,
              programmed_date: new Date(tryoutData.date),
              reason: tryoutData.reason,
              injectionProcess: {
                create: {
                  proc_technician: tryoutData.InjectionProcess.proc_technician,
                  quantity: tryoutData.InjectionProcess.quantity,
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
          const FindAllTryout = await PrismaHelper.prisma.solicitationTryout.findMany({
            where: {
              id: result.id
            },
            include: {
              injectionProcess: {
                include: {
                  feedstock: true,
                  labor: true,
                  mold: true
                }
              }
            }
          })
      
        const mapInjectionProcess = await PrismaHelper.mapInjectionProcess(FindAllTryout)
      return mapInjectionProcess
    }
  
} 