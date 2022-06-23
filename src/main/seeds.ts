import { PrismaHelper } from "../infra/db/mysql/helpers/prisma-helper";
const seeds = async (): Promise<void> =>  {
 let isValid = await PrismaHelper.prisma.homologationStatus.count()
 if (isValid == 0) {
  const fields = ['Aprovado', 'Reprovado', 'Revisao']
  for (const field of fields) {
    const result = await PrismaHelper.prisma.homologationStatus.createMany({
      data: {
      description:  field
      }
     })
   console.log(`Creation Seeds homologationStatus: ${field}`)
  }
  return
 }
 console.log('Seeds already created!')

} 

seeds()