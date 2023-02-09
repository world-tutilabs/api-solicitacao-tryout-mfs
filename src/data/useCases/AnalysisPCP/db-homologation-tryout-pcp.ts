import Handlebars from "handlebars";
import path from "path";
var fs = require('fs');
import { IHomologate, IHomologationTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { AppError } from "../../../presentation/errors/AppError";
import { IFindByHomologateTryoutPCPRepository } from "../../protocols/database/AnalysisPCP/find-by-homologate-tryout-pcp-repository";
import { IHomologationRepositoryInRepository } from "../../protocols/database/AnalysisPCP/homologate-pcp-repository";
import { IMailProvider } from "../../protocols/providers/IMailProvider";


export class DbHomologationTryoutPCP implements IHomologationTryoutPCP{

    constructor(
    private readonly mailProvider: IMailProvider,
    private readonly homologationRepositoryInRepository: IHomologationRepositoryInRepository,
    private readonly findByHomologateTryoutPCPRepository: IFindByHomologateTryoutPCPRepository,
    ){}
    
async homologateTryout({id, status, userHomologate, comment}: IHomologate): Promise<void> { 

  if( status == 3 || status < 0 || status > 5 ){ 
     throw new AppError('Status indisponível', 403);
  }

  const findHomologate = await this.findByHomologateTryoutPCPRepository.findByHomologateTryout(id);
 
if(status == 4){
  if(findHomologate.status.id != 1){
     throw new AppError('Solicitação de Tryout não pode ser cancelada', 401);
  }
}

var source = fs.readFileSync(path.join(__dirname,'../../../utils/handlebars/emailStructure.hbs'), 'utf8');

const attachments =  [{
  filename: 'iconMolde.png',
  path: path.join( __dirname + '../../../../utils/img/iconMolde.png'),
  cid: 'unique@cid'
}]


var template = Handlebars.compile(source);

  const dataHomologate = await this.homologationRepositoryInRepository.homologate({id, status, userHomologate, comment});
 
  try {

    const homologate: any = Object(dataHomologate.homologation_user);

    const mailList = [
      "eng_tec@tutiplast.com",
      "dornilson.borges@tutiplast.com.br",
      "auzimar@tutiplast.com.br"
  ]
    
    await this.mailProvider.sendMail({
        to: mailList,
        from: {
            name: 'MFS - Molding File System',
            email: 'tutilabs@tutiplast.com.br',
        },
        subject: `Solicitação de Tryout ${dataHomologate.solicitation.number_tryout} - ${dataHomologate.status.description} `,
        body: template({  
                      tryout : dataHomologate.solicitation.number_tryout || 'N/A',
                      produto: dataHomologate.solicitation.code_sap || 'N/A',
                      molde: dataHomologate.solicitation.injectionProcess.mold.desc_mold || 'N/A',
                      autor: homologate.nome_completo || 'N/A',
                      data: dataHomologate.homologation_at || 'N/A',
                      status: dataHomologate.status.description || 'N/A',
                      motivo :  `${dataHomologate.comment} - acesse o sitema para homologar`  || 'N/A',
                      }),
        attachments  
        });

       } catch (error) {
        throw new AppError('Erro ao enviar E-mail', 500);    
     } 
   }

}