import { PrismaClient } from '@prisma/client'
import { TryoutModel } from '../../../../domain/models/tryout'
export const PrismaHelper = {
   prisma: new PrismaClient(),
   async mapInjectionProcess (data: object): Promise<TryoutModel> {
    const {id, code_sap,product_description,client,date,reason,id_status, injection_process } = data[0]
    const obj = {
      id: injection_process[0].id,
      id_tryout: injection_process[0].id_tryout,
      labor: injection_process[0].labor,
      mold: injection_process[0].molde,
      machine: injection_process[0].machine,
      feedstock: injection_process[0].feedstocks,
      peripheral: injection_process[0].peripheral[0]
     }
    return {id, code_sap,product_description,client,date,reason,id_status,InjectionProcess: obj}
   } 
   
}
