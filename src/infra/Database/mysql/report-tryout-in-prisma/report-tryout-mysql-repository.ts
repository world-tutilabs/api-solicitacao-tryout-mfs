import dayjs from "dayjs";
import { IFindByRequestTryoutRepository } from "../../../../data/protocols/db/ReportTryout/find-by-request-tryout-repository";
import { IListRequestTryoutHomologateRepository } from "../../../../data/protocols/db/ReportTryout/list-request-tryout-homologate-repository";
import { IHomologateTryoutDTO } from "../../../../domain/models/IHomologateTryoutDTO";

import { PrismaHelper } from "../helpers/prisma-helper";

export class ReportTryoutMysqlRepository implements IFindByRequestTryoutRepository, IListRequestTryoutHomologateRepository {
   async  findByRequestTryoutRepository(id: string): Promise<IHomologateTryoutDTO> {
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
                        reason: true,
                        injectionProcess: {
                            select: {
                                id: true,
                                id_tryout: true,
                                proc_technician: true,
                                quantity: true,
                                mold: true
                            }
                        },
                    }
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
                    id: 1
                },
                solicitation:{
                    programmed_date:{
                        gte: new Date(dayjs().format('YYYY-MM-DD'))
                    }
                }
            }
        })
        return data;
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
                        reason: true,
                        injectionProcess: {
                            select: {
                                id: true,
                                id_tryout: true,
                                proc_technician: true,
                                quantity: true,
                                mold: true
                            }
                        },
                    }
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
                    id: 1
                },
                solicitation:{
                    programmed_date:{
                        gte: new Date(dayjs().format('YYYY-MM-DD'))
                    }
                }
                
            }
        })
     
        return data;
    
    }



}