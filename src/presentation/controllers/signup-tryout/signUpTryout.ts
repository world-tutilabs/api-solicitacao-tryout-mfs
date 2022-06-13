import { AddTryout } from '../../../domain/usecases/signup-tryout/add-tryout'
import {badRequest, ok, serverError} from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class SignUpTryoutController implements Controller {  
  private readonly addTryout: AddTryout
  private readonly validation: Validation
  constructor(addTryout: AddTryout, validation: Validation) {
    this.addTryout = addTryout
    this.validation = validation
  }   
  async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
        try {
          const error = this.validation.validate(httpRequest.body)
          if (error) {
            return badRequest(error)
          }
            const tryout = await this.addTryout.add(httpRequest.body)
           return ok(tryout)
        }catch(error) {
            return serverError(error)
        }
    }
//     async index(req, res){
//         try {
//             let obj = {name:'oin'}
//             if (obj.name) {
//                 const ok = httpHelper.ok(obj)
//                 res.status(ok.statusCode).json(ok)
//             }
//         }catch(error) {
            
//            const errorServe =  httpHelper.serverError(error)
//            res.status(errorServe.statusCode).json(errorServe.body)

//         }
        
//         // let reasonValid = await Tryout.findReason();
//         // let processValid = await Tryout.findByProcessAll();
//         // let sapValid = await Tryout.findByCodeSap();
//         // let offices = await Tryout.findOfficeAll();
//         // let users = await Users.findAllTec();

//         // if(processValid.length > 0 || sapValid.length > 0 || reasonVali.lengthd > 0 || offices.length > 0 ){
//         //     res.status(200);
//         //     res.json({status:true, process:processValid,sap:sapValid,reason:reasonValid,office:offices,users : users});
//         // }else{
//         //     res.status(404);
//         //     res.json({status:false,msg:"Nenhum Dado encontrado!"});
//         // }
//     }

//     async create(req, res) {

//         // let { code_sap, product_description, client, date, reason, process, amount, office } = req.body;
//         let { code_sap, product_description, client, date, reason, process, ObjProcess } = req.body;
      
//       console.log(ObjProcess)

//        const v = new Validator(req.body, {
//             code_sap: 'required',
//             product_description: 'required',
//             client: 'required|integer|min:1',
//             date: 'required|dateFormat:YYYY-MM-DD',
//             reason: 'required|maxLength:250',
//             // process: 'required|arrayUnique|lengthBetween:1,6',
//             // amount: 'required|array',
//             // office: 'required|array|lengthBetween:1,6',
//         });

//         const matched = await v.check();

//         if (!matched) {
//             res.status(422);
//             res.json(v.errors);
//             return;
//         }
// let code_sap_exist = 0;

//       if (code_sap_exist.length > 0) {
//             res.status(406);
//             res.json({ error: "Código Sap já cadastrado!" });
//             return;
//         } else {
//             let result = await Tryout.create(code_sap, product_description, client, date, reason);
//             // ID of Try-out created in data base
//             // Obs: Por um 'and' pois possa ser que o mesmo não salve nenhum processo, verificar essa viabilidade.
//             if (result) {
//                 process.forEach(async element => {

//                             try {
//                                 //salva valores na tabela Injection_Process
//                                 await Tryout.create_Fk_process(result, element.id,ObjProcess);
//                                 //salva valores na tabela Tryout_Process
//                                 await Tryout.create_tryout_process(result, element.id, element.quantidade, element.office);
//                                 return;
//                             } catch (error) {
//                                 console.log(error);
//                                 return;
//                             }
//                 });
//                 let data = await Tryout.findAll()
//                 console.log(data)
//                 res.status(200);
//                 res.json({ status: true, msg: "Tryout Cadastrado com Sucesso!",data:data });
//             } else {
//                 res.status(412);
//                 res.json({ status: false, error: result });
//             }
//         }
//     }

//     async update(req, res) {
//         let id = parseInt(req.params.id);
//         if (Number.isInteger(id)) {
//             if (id > 0) {
//                 let { code_sap, product_description, client, date, reason, process, amount, office } = req.body;
//                 let trytouExist = await Tryout.findById(id);
//                 if (trytouExist.length > 0) {
//                     const v = new Validator(req.body, {
//                         code_sap: 'required',
//                         product_description: 'required|maxLength:250',
//                         client: 'required|integer|min:1',
//                         date: 'required|dateFormat:YYYY-MM-DD',
//                         reason: 'required|maxLength:250',
//                         process: 'required|integer|min:1',
//                         amount: 'required|integer|min:0',
//                         office: 'required|integer|min:1',
//                     });

//                     const matched = await v.check();

//                     if (!matched) {
//                         res.status(422);
//                         res.json(v.errors);
//                         return;
//                     }

//                     let result = await Tryout.update(code_sap, product_description, client, date, reason, process, amount, office, id);
//                     if (result) {
//                         res.status(200);
//                         res.json({ status: true, msg: "Dados Atualizados com sucesso!" });
//                     } else {
//                         res.status(412);
//                         res.json({ status: false, error: result });
//                     }
//                     console.log(result);
//                 } else {
//                     res.status(404);
//                     res.json({ status: false, error: "Tryout não encontrado!" });
//                     return;
//                 }

//             } else {
//                 res.status(400);
//                 res.json({ status: false, error: "parametro invalido!" });
//                 return;
//             }
//         } else {
//             res.status(400);
//             res.json({ status: false, error: "parametro invalido!" });
//             return;
//         }
//     }
//     async showAll(req, res) {

//         let tryoutExist = await Tryout.findAll();

//         if (tryoutExist) {
//             res.status(200);
//             res.json({ status: true, tryoutAll: tryoutExist });
//         } else {
//             res.status(404);
//             res.json({ status: false, error: "Nenhum dado encontrado!" });
//         }
//     }
//     async showId(req, res) {
//         let id = parseInt(req.params.id);
//         if (Number.isInteger(id)) {
//             if (id > 0) {
//                 let result = await Tryout.findById(id);
//                 if (result.length > 0) {
//                     res.status(200);
//                     res.json({ status: true, tryout: result });
//                 } else {
//                     res.status(404);
//                     res.json({ status: false, error: "Nenhum dado encontrado!" });
//                     return;
//                 }
//             } else {
//                 res.status(400);
//                 res.json({ status: false, error: "Parametro invalido!" });
//                 return;
//             }
//         } else {
//             res.status(400);
//             res.json({ status: false, error: "Parametro invalido!" });
//             return;
//         }
//     }
//     async remove(req, res) {
//         let id = parseInt(req.params.id);
//         if (Number.isInteger(id)) {
//             if (id > 0) {
//                 let tryoutExist = await Tryout.findById(id);
//                 if (tryoutExist.length > 0) {
//                     let result = await Tryout.delete(id);
//                     if (result) {
//                         res.status(200);
//                         res.json({ status: true, msg: "Tryout Removido com Sucesso!" });
//                     } else {
//                         res.status(400);
//                         res.json({ status: false, error: "Error! não pode ser removido!" });
//                     }
//                 } else {
//                     res.status(404);
//                     res.json({ status: false, error: "Tryout Não encontrado!" });
//                 }

//             } else {
//                 res.status(400);
//                 res.json({ status: false, error: "Parametro invalido!" });
//             }
//         } else {
//             res.status(400);
//             res.json({ status: false, error: "Parametro invalido!" });
//             return;
//         }
//     }

//     async showDataTryout(req, res) {
  
//              let tryout_Exist = await Tryout.findByAllTryout();
       
//             if (tryout_Exist) {
//                 res.status(200);
//                 res.json(tryout_Exist);
//                 return;
//             } else {
//                 res.status(400);
//                 res.json({ status: false, error: "Tryout não encontrado!" });
//                 return;
//             }
      

//     }

//     async findByDataTryout(req, res) {
//         const { id } = req.params
//         console.log(id)
//         let tryout_Exist = await Tryout.findByTryout(id);
//         if (id > 0) {
//             if (tryout_Exist) {
//                 res.status(200);
//                 res.json(tryout_Exist);
//                 return;
//             } else {
//                 res.status(400);
//                 res.json({ status: false, error: "Tryout não encontrado!" });
//                 return;
//             }
//         } else {
//             res.status(400);
//             res.json({ status: false, error: "Parametro invalido!" });
//             return;
//         }

//       // tetste

//     }

//     async ChangeStatusTryout(req, res){
//         let { id } = req.params
//         let { dataREP  } = req.body
//         let newData;
//         //Buscar Tryouy
//         let data = await Tryout.findByTryout(id);
//         //Validação de existencia de Tryout
      

//         if (data) {
            
//           newData = data[0].date;

//             if(newData != dataREP){
//               newData = dataREP;
//             }
      
//           // Ficar atento pois o fluxo Analise PCP e Analise ENG gira em torno da modificação de status e analise de processos.
//           //Obs: Pode parece confus, porém, é apenas ficar atento no status do proprio tryout e os status dos processos
        
//           let injection ,tampografia,serigrafia,impressao,pintura,montagem;

//           if(data[data.findIndex((element) => element.Id_Processo === 1)] !== undefined){ injection  = data[data.findIndex((element) => element.Id_Processo === 1)].status_pcp_PI};
//           if(data[data.findIndex((element) => element.Id_Processo === 2)] !== undefined){ tampografia = data[data.findIndex((element) => element.Id_Processo === 2)].status_pcp_PT;}
//           if(data[data.findIndex((element) => element.Id_Processo === 3)] !== undefined){ serigrafia = data[data.findIndex((element) => element.Id_Processo === 3)].status_pcp_SP}
//           if(data[data.findIndex((element) => element.Id_Processo === 4)] !== undefined){ impressao  = data[data.findIndex((element) => element.Id_Processo === 4)].status_pcp_IMP}
//           if(data[data.findIndex((element) => element.Id_Processo === 5)] !== undefined){ pintura    = data[data.findIndex((element) => element.Id_Processo === 5)].status_pcp_P}
//           if(data[data.findIndex((element) => element.Id_Processo === 6)] !== undefined){ montagem   = data[data.findIndex((element) => element.Id_Processo === 6)].status_pcp_M}
 

    
//           // Se houver algum processo que não foi analizado
//            //CODIÇÃO PRO PCP
           
//            if(data[0].status == 2){
//              console.log(injection ,tampografia,serigrafia,impressao,pintura,montagem);
//              console.log('acimaPCP');

//           if((injection == 0  )|| ( tampografia == 0) || ( serigrafia == 0) ||
//             ( impressao == 0) || ( pintura == 0)  || ( montagem == 0 ))
//             {
            
//             res.json({ status : "Existe processos não analisados",complemento:'Verifique os processos em branco!!', result: 1});
        
//           }//Se houver algum processo reprovado pelo PCP
//           else if(injection == 2  || tampografia == 2 || serigrafia ==  2 ||
//                    impressao == 2 || pintura == 2 || montagem == 2)
//           {
                                                       
//             await Tryout.updateStatusTryout(id,1, newData);
//             res.status(200);
//             res.json({ status: "Tryout enviado para reanálise de Engenharia!!", complemento : 'Devido a reprovação de processos' ,result:2 });
//             return;

//           }else{
//             // Se os processos forem Editados pelo Analista de Engenharia o status do processo volta para 'NULL' ou ' 0 ' para reanlise de PCP
//                 await Tryout.updateStatusTryout(id,3,newData);
//                 res.status(200);
//                 res.json({ status: "Tryout enviado para Programação!!", complemento : 'Status Programado' ,result:3 });
//                 return;
//           }
//          // FIM DE CONDIÇÕES PARA O PCP

//          // CONDIÇÕES PARA ENGENHARIA
//         }else if(data[0].status == 1){
//                //DIFERENTE DO PCP O STATUS DO PROCESSO TEM QUE ZERAR PARA SER REANALIZADO PELO PCP 
//                console.log(injection ,tampografia,serigrafia,impressao,pintura,montagem);
//                console.log('acimaeng');
//                 if(injection == 2  || tampografia == 2 || serigrafia == 2 ||
//                   impressao ==  2 || pintura == 2 || montagem == 2)
//                   {
                  
//                   res.json({ status : "Processos não revisados",complemento:'Verifique os processos reprovados em vermelho!!', result: 1});
//                    return;
//                 }else{
//                     await Tryout.updateStatusTryout(id,2,newData);
//                     res.status(200);
//                     res.json({ status : "Processos revisados",complemento:'Tryout enviado para analise de PCP!!', result: 3});

//                 }

//          }
        
    
            
//         } else {
//             res.status(404);
//             res.json({ status: false, error: "Tryout não encontrado!!" });
//             return;
//         }
      
   

//     }

//     async ReprogramTryOut(req, res) {
//       const { id } = req.params;
  
//       let data = await Tryout.findByTryout(id);
  
//       if (!data) {
//         return res
//           .status(404)
//           .res.json({ status: false, error: "Tryout não encontrado!!" });
//       }
  
//       const result = await Tryout.reprogramStatusTryOut(id);
  
//       console.log(result);
  
//       res.status(200).json({ message: "Data reprogramada" });
//     }
    


}
