const { Validator } = require("node-input-validator");
const ProcessScreen = require("../../models/ProcessScreen");

class ProcessScreenController {
    async create(req, res) {
        const {id} = req.params
        if (id > 0) {
            const { labor_description, labor_amount } = req.body;

            const v = new Validator(req.body,{
                labor_description: "required",
                labor_amount: 'required'
            })
            let matched = await v.check();
            if (!matched) {
                res.status(442)
                res.json(v.errors);
                return;
            }

            let labor_json
            
            if (labor_description.length === labor_amount.length) {
                if (Array.isArray(labor_description)) {
                    labor_json = '{'
                    for (let i = 0; i < labor_description.length; i++) {
                        labor_json += `"MAO${[i]}": {"DESCRIPTION": "${labor_description[i]}", "AMOUNT": "${labor_amount[i]}" }`
                        if ((i + 1) < labor_description.length) {
                            labor_json += ','
                        }
                    }
                    labor_json += '}'
                }
            } else {
                res.status(404)
                res.json({status: false, erro: "Preencha todos os campos."})
            }

            await ProcessScreen.create(id, labor_json)
            // res.json(JSON.parse(labor_json));
            // return labor_json;
            return;

        } else {
            res.status(404),
            res.json({
                status: false,
                erro: 'Não encontrado'
            })
        }
        return;
    }

    async updateFromPCP(req, res) {
        
        let id = req.params.id;

        if (id) {
        
           let { comments, status } = req.body;
            console.log(comments, status)

            const v = new Validator(req.body, {
                comments: 'required',
                status: 'required'
            });

            let matched = await v.check();
            if (!matched) {
                res
                    .status(442)
                    .json(v.errors);
                return;
            }

            let resp = await ProcessScreen.updatePCP(status, comments, 'Luan Albuquerque', id);
            console.log(resp)
            return resp;

        } else {

            res.status(400);
            res.json({ status: false, error: "Parametro invalido!" });
            return;


        }

    }
  
    async updateFromENG(req, res){
      let id = req.params.id;
    
      if(id){

      let {newlabor,idlabor} = req.body
      
        await ProcessScreen.updateENG(id,JSON.stringify(newlabor), idlabor, 0)
       
      }else{
 
         res.status(400);
         res.json({ status: false, error: "Parametro invalido!" });
         return;
 
        }
 
     }
     


    
}

module.exports = new ProcessScreenController();