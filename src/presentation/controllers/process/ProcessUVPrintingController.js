const { Validator } = require("node-input-validator");
const ProcessUVPrinting = require("../../models/ProcessUVPrinting");


class ProcessUVPrintingController {

    async create(req, res) {

        const { id } = req.params;

        const data_id_process = await ProcessUVPrinting.findByEditProcess(id);

        //   console.log(data_id_process)
        if (id > 0) {
            if (data_id_process == 1) {

                let { machine, labor_description, labor_amount } = req.body;
                const v = new Validator(req.body, {

                    machine: "required|integer",
                    labor_description: "required|array",
                    labor_amount: "required|array",

                });

                const matched = await v.check()
                if (!matched) {
                    res.status(442)
                    res.json(v.errors);
                    return;
                }

                let labor_json
                if (labor_amount.length == labor_description.length) {
                    res.send({ msg: "Processo encontrado e valido para alteração!!!" })
                    //Verify if this variable is a Array  - Labor of pad printing process
                    if (Array.isArray(labor_description)) {
                        labor_json = `{`
                        for (let i = 0; i < labor_description.length; i++) {
                            labor_json += `"MAO${i}" : { "DESCRIPTION" : "${labor_description[i]}" , "AMOUNT" : "${labor_amount[i]}" }`
                            if ((i + 1) < labor_description.length) {
                                labor_json += ','
                            }
                        }
                        labor_json += `}`
                    }

                    await ProcessUVPrinting.create(id,labor_json,machine);
                } else {

                    res.status(442)
                    res.send({ msg: "Erro em arrays" })
                    return;
                }


                return;

            } else {

                res.send({ msg: "Processo já preenchido" })

            }

        } else {
            res.status(404);
            res.json({ status: false, error: "UV Printing Process not found" })
        }


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

            // let resp = await ProcessScreen.updatePCP(status, comments, 'Luan Albuquerque', id);
            let resp = await ProcessUVPrinting.updatePCP(status, comments, 'Luan Albuquerque', id);
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
      let {newlabor,newmachine,idlabor} = req.body
      
        await ProcessUVPrinting.updateENG(id,JSON.stringify(newlabor),JSON.stringify(newmachine),idlabor,0)
        
      }else{
 
         res.status(400);
         res.json({ status: false, error: "Parametro invalido!" });
         return;
 
        }
 
     }





}

module.exports = new ProcessUVPrintingController();
