import { IHomologate, IHomologationTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { AppError } from "../../../presentation/errors/AppError";
import { IFindByHomologateTryoutPCPRepository } from "../../protocols/db/AnalysisPCP/find-by-homologate-tryout-pcp-repository";
import { IHomologationRepositoryInRepository } from "../../protocols/db/AnalysisPCP/homologate-pcp-repository";
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

  const dataHomologate = await this.homologationRepositoryInRepository.homologate({id, status, userHomologate, comment});
 
  try {

    const homologate: any = Object(dataHomologate.homologation_user);
    await this.mailProvider.sendMail({
        to:{
            name: 'Luan Albuquerque',
            email: 'luan.santos6605@gmail.com',
            // email: `${homologate.email}`,
        },
        from: {
            name: 'MFS - Molding File System',
            email: 'portariatutiplast@gmail.com',
        },
        subject: `Solicitação de Tryout ${dataHomologate.solicitation.number_tryout} - ${dataHomologate.status.description} `,
        body:  `
        <h3>Tryout - ${dataHomologate.solicitation.number_tryout}</h3>
        <h3>Codigo do Produto: ${dataHomologate.solicitation.code_sap}  </h3>
        <h3>Codigo do Molde: ${dataHomologate.solicitation.injectionProcess.mold.desc_mold}  </h3>
        <h3>Responsavel PCP: ${homologate.nome_completo}  </h3>            
        <h3>Data de Homologação PCP: ${homologate.atualizado_em}  </h3>  
        <h3>Situação: ${dataHomologate.status.description}  </h3>  
        <h3>Motivo (comentário): ${dataHomologate.comment}  </h3>  
         `,
        });

       } catch (error) {
        throw new AppError('Erro ao enviar E-mail', 500);    
     } 
   }

}