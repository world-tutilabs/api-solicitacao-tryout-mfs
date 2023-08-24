import { ISolicitationTryoutDTO } from "../../../../domain/models/ISolicitationTryoutDTO";
import {
  AddTryout,
  AddTryoutModel,
} from "../../../../domain/useCases/SolicitationTryout/New-Mold/add-tryout";
import { AddTryoutRepository } from "../../../protocols/database/SolicitationTryout/New-Mold/add-tryout-repository";
import { IMailProvider } from "../../../protocols/providers/IMailProvider";

import Handlebars from "handlebars";
import path from "path";
import { AppError } from "../../../../presentation/errors/AppError";
var fs = require("fs");

export class DbAddTryout implements AddTryout {
  constructor(
    private readonly addTryoutRepository: AddTryoutRepository
  ) // private readonly mailProvider: IMailProvider
  {}

  async add(tryout: AddTryoutModel): Promise<ISolicitationTryoutDTO> {
    const tryout_soli = await this.addTryoutRepository.add(tryout);

    // console.log(save);
    //     const tryout_soli:ISolicitationTryoutDTO = {
    //       id: 'fb0d521a-02ed-4bce-8b85-9eef8131ae06',
    //       number_tryout: 6,
    //       code_sap: '5012',
    //       desc_product: 'description product new',
    //       client: 'Positivo',
    //       programmed_date: new Date(),
    //       reason: 'Molde Novo',
    //       injectionProcess: {
    //         id: '1ed2eb56-0c5f-450e-9221-80a5bd8b9199',
    //         id_tryout: 'fb0d521a-02ed-4bce-8b85-9eef8131ae06',
    //         proc_technician: 'Rafael Railton Bugas',
    //         quantity: 25,
    //         feedstock: {
    //           id: '1f9c86a5-8a6f-442d-8f7f-318d51a0c5bc',
    //           description: 'descricao Padrao Materia Prima',
    //           kg: 18.8,
    //         },
    //         labor: {
    //           id: '9c21f639-29e5-4d8d-a3cd-334a483b19b0',
    //           amount: 1,
    //           description: 'descricao Padrao Mão de Obra',
    //           id_injection_process: 'fb0d521a-02ed-4bce-8b85-9eef8131ae06'
    //         },
    //         mold: {
    //           id: '16cd062e-0ef8-4799-b497-33f1f8df2b93',
    //           number_cavity: 4,
    //           desc_mold: 'Padrao descricao Molde',
    //           id_injection_process: 'fb0d521a-02ed-4bce-8b85-9eef8131ae06'
    //         },
    //         machine: {
    //           id: '969a3883-e0d7-4e16-a24d-61056926a38b',
    //           model: 'MAQ10',
    //           id_injection_process: 'fb0d521a-02ed-4bce-8b85-9eef8131ae06'
    //         }
    //       }
    //     }

    var source = fs.readFileSync(
      path.join(__dirname, "../../../../utils/handlebars/emailStructure.hbs"),
      "utf8"
    );

    const attachments = [
      {
        filename: "iconMolde.png",
        path: path.join(__dirname + "../../../../../utils/img/iconMolde.png"),
        cid: "unique@cid",
      },
    ];

    var template = Handlebars.compile(source);

    try {
      // const homologate: any = Object(dataHomologate.homologation_user);
      const mailList = [
        // "eng_tec@tutiplast.com",
        "dornilson.borges@tutiplast.com.br",
        "auzimar@tutiplast.com.br",
      ];

      // await this.mailProvider.sendMail({
      //   to: mailList,
      //   from: {
      //     name: "MFS - Molding File System",
      //     email: "tutilabs@tutiplast.com.br",
      //   },
      //   subject: `Solicitação de Tryout ${tryout_soli.number_tryout} - em Homologação`,
      //   body: template({
      //     tryout: tryout_soli.number_tryout || "N/A",
      //     produto: tryout_soli.code_sap || "N/A",
      //     molde: tryout_soli.injectionProcess.mold.desc_mold || "N/A",
      //     autor: tryout_soli.injectionProcess.proc_technician || "N/A",
      //     data: tryout_soli.programmed_date || "N/A",
      //     status: "Em homologação" || "N/A",
      //     motivo: "Nova solicitação de Tryout" || "N/A",
      //   }),
      //   attachments,
      // });
    } catch (error) {
      throw new AppError("Erro ao enviar E-mail", 500);
    }

    return tryout_soli;
  }
}
