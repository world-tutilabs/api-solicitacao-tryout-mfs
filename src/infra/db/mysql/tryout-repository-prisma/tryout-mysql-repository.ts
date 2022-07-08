import { AddTryoutRepository } from '../../../../data/protocols/db/SolicitationTryout/New-Mold/add-tryout-repository';
import { IListTryoutRepository } from '../../../../data/protocols/db/SolicitationTryout/New-Mold/list-tryout-repository';
import { ISolicitationTryoutDTO } from '../../../../domain/models/ISolicitationTryoutDTO';
import { AddTryoutModel } from '../../../../domain/useCases/SolicitationTryout/New-Mold/add-tryout';
import { UpdateTryoutModel } from '../../../../domain/useCases/SolicitationTryout/New-Mold/update-tryout';
import {PrismaHelper} from '../helpers/prisma-helper';

export class TryoutMysqlRepository implements AddTryoutRepository, IListTryoutRepository {
  constructor () {}
  async add (tryoutData: AddTryoutModel): Promise<ISolicitationTryoutDTO> {
      const result = await PrismaHelper.prisma.solicitationTryout.create({
            data: {
              code_sap: tryoutData.code_sap,
              desc_product: tryoutData.product_description,
              client: tryoutData.client,
              programmed_date: new Date(tryoutData.date),
              reason: tryoutData.reason,
              homologation: {
                create: {
                  created_user: {nome:tryoutData.user.nome_completo.trim(),
                    matricula: tryoutData.user.matricula.trim(),
                    role: tryoutData.user.nivel_de_acesso['descricao'].trim(),
                    date: new Date().toDateString() 
                  },
                  created_at: new Date(),
                  fk_homologation_status: 1
                }
              },
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
  async list(): Promise<ISolicitationTryoutDTO[]> {
    const result = await PrismaHelper.prisma.solicitationTryout.findMany({
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
  async update(tryoutData: UpdateTryoutModel): Promise<ISolicitationTryoutDTO> {
    
    console.log(tryoutData.id)
    const result = await PrismaHelper.prisma.solicitationTryout.update({
      where: {
        id: tryoutData.id
      },
      data: {
        code_sap: tryoutData.code_sap,
        desc_product: tryoutData.product_description,
        client: tryoutData.client,
        reason: tryoutData.reason,
        programmed_date: new Date(tryoutData.date),
        homologation: {
          update: {
            fk_homologation_status: 3,
          }
        },
        injectionProcess: {
          update: {
            proc_technician: tryoutData.InjectionProcess.proc_technician,
            quantity: tryoutData.InjectionProcess.quantity,
            labor: {
              update: {
                amount: tryoutData.InjectionProcess.labor.amount,
                description: tryoutData.InjectionProcess.labor.description
              }
            },
            mold: {
              update: {
                number_cavity: tryoutData.InjectionProcess.mold.number_cavity,
                desc_mold: tryoutData.InjectionProcess.mold.mold
              }

            },
            feedstock: {
              update: {
                code: tryoutData.InjectionProcess.feedstocks.code,
                description: tryoutData.InjectionProcess.feedstocks.description
              }
            }
          }
        }
      }

    })
    return result
  }
  async findByIdSolicitationTryout (id:string): Promise <ISolicitationTryoutDTO> {
    const result = await PrismaHelper.prisma.solicitationTryout.findUnique({
      where: {
        id
      }
    })
    return result
  } 
} 