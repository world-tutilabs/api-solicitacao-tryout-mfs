import { IHomologate, IHomologationTryoutPCP } from "../../../domain/useCases/AnalysisPCP/IHomologation-Tryout-PCP";
import { serverError } from "../../../presentation/helpers/http-helper";
import { IFindByHomologateTryoutPCPRepository } from "../../protocols/db/AnalysisPCP/find-by-homologate-tryout-pcp-repository";
import { IHomologationRepositoryInRepository } from "../../protocols/db/AnalysisPCP/homologate-pcp-repository";
import { IMailProvider } from "../../protocols/providers/IMailProvider";



export class DbHomologationTryoutPCP implements IHomologationTryoutPCP{

    constructor(
    private readonly mailProvider: IMailProvider,
    private readonly homologationRepositoryInRepository: IHomologationRepositoryInRepository,
    private readonly findByHomologateTryoutPCPRepository: IFindByHomologateTryoutPCPRepository
    ){}
    
    async homologateTryout(data: IHomologate): Promise<void> {
    console.log('Entrou aqui 1');
     
    const dataHomologate = await this.homologationRepositoryInRepository.homologate(data);
    
    console.log('Entrou aqui 2');
    
    console.log(dataHomologate);

    const tryouthomologate = await this.findByHomologateTryoutPCPRepository.findByHomologateTryout(dataHomologate.id)
     
    console.log('Entrou aqui 3');
    
    console.log(tryouthomologate);
  
    
     await this.mailProvider.sendMail({
        to:{
            name: 'Luan Albuquerque',
            email: 'luan.santos6605@gmail.com',
        },
        from: {
            name: 'Portaria',
            email: 'portariatutiplast@gmail.com',
        },
        subject: 'Teste de Node',
        body: 'Teste de Node no html',
    });

    } 

}