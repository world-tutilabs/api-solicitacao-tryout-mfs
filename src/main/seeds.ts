import { PrismaHelper } from "../infra/Database/mysql/helpers/prisma-helper";
const seeds = async (): Promise<void> =>  {
 let isValid = await PrismaHelper.prisma.homologationStatus.count()
 if (isValid == 0) {

  const data = [
     { id: 1, description: 'Aprovado' },
     { id: 2, description: 'Reprovado' },
     { id: 3, description: 'Revisao'},
     { id: 4, description: 'Cancelado'},
     { id: 5, description: 'Concluido' }
  ]
    const result = await PrismaHelper.prisma.homologationStatus.createMany({
      data
     })
     
   console.log(`Creation Seeds homologationStatus: ${ JSON.stringify(result)}`)
  
  return
 }
 console.log('Seeds already created!')

} 

seeds()