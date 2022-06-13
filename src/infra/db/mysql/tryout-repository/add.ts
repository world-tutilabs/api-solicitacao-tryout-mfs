import {AddTryoutRepository} from '../../../../data/protocols/add-tryout-repository'
import { TryoutModel } from '../../../../domain/models/tryout';
import { AddTryoutModel } from '../../../../domain/usecases/signup-tryout/add-tryout';
import {PrismaHelper} from '../helpers/prisma-helper';

export class AddTryoutMysqlRepository implements AddTryoutRepository{
  async add (tryoutData: AddTryoutModel): Promise<TryoutModel>{ 
      const result = await PrismaHelper.prisma.tryout.create({
            data: {
              code_sap: tryoutData.code_sap,
              product_description: tryoutData.product_description,
              client: tryoutData.client,
              date: new Date(),
              reason: tryoutData.reason,
              id_status: tryoutData.status,
              injection_process: {
              create: [{
                  labor: {
                    create: [
                      {
                        description: tryoutData.InjectionProcess.labor.description,
                        amount: tryoutData.InjectionProcess.labor.amount
                      }
                    ] 
                  },
                  molde: {
                    create: [{
                      number_cavity:tryoutData.InjectionProcess.mold.number_cavity,
                      mold: tryoutData.InjectionProcess.mold.mold
                    }]
                  },
                  feedstocks: {
                    create: [
                      {
                        code: tryoutData.InjectionProcess.feedstocks.code,
                        description: tryoutData.InjectionProcess.feedstocks.description
                      }
                    ]
                  } ,
                  machine: {
                    create: [{
                      model: tryoutData.InjectionProcess.machine.model
                    }]
                  },
                  peripheral: {
                    create: [{
                      peripheral: tryoutData.InjectionProcess.peripherals
                    }]
                  }
                }]
              }
            }
          })
       
          const FindAllTryout = await PrismaHelper.prisma.tryout.findMany({
            where: { id: result.id },
            include: {
              injection_process: {
                include:{
                  labor: true,
                  molde: true,
                  machine: true,
                  feedstocks: true,
                  peripheral: true
                }
              }
            }
          })
          const mapInjectionProcess = await PrismaHelper.mapInjectionProcess(FindAllTryout)
    
        return mapInjectionProcess
    }
  
} 