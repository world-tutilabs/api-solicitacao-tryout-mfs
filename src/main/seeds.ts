import { PrismaHelper } from "../infra/Database/mysql/helpers/prisma-helper";
const seeds = async (): Promise<void> => {
  let homologation_status =
    await PrismaHelper.prisma.homologationStatus.count();
  const reason = await PrismaHelper.prisma.reason.count();
  if (homologation_status === 0) {
    const data = [
      { id: 1, description: "Solicitação Aprovada" },
      { id: 2, description: "Solicitação Reprovada" },
      { id: 3, description: "Análise PCP" },
      { id: 4, description: "Cancelado" },
      { id: 5, description: "Relatório Aprovado" },
      { id: 6, description: "Relatório Reprovado" },
    ];
    const result = await PrismaHelper.prisma.homologationStatus.createMany({
      data,
    });

    console.log(
      `Seeded successfully on table 'homologationStatus': ${JSON.stringify(
        result
      )}`
    );

    if (reason === 0) {
      const data = [
        { id: 1, description: "Novo" },
        { id: 2, description: "Retroativo" },
        { id: 3, description: "Novo Produto" },
        { id: 4, description: "Modificação de Molde" },
      ];
      const result = await PrismaHelper.prisma.reason.createMany({
        data,
      });

      console.log(
        `Seeded successfully on table 'reason': ${JSON.stringify(result)}`
      );
    }

    return;
  }

  console.log("Seeds already created!");
};

seeds();
