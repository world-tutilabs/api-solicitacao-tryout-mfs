const { Validator } = require("node-input-validator");
const ProcessAssembly = require("../../models/ProcessAssembly");

class ProcessAssemblyController {

    async create(req, res) {

        const { id } = req.params;

        const data_id_process = await ProcessAssembly.findByEditProcess(id);
        //  console.log(data_id_process)
        if (id > 0) {
            if (data_id_process == 1) {

                const { equipament_description, equipament_amount, labor_description, labor_amount } = req.body;

                const v = new Validator(req.body, {

                    equipament_description: "required|array",
                    equipament_amount: "required|array",
                    labor_description: "required|array",
                    labor_amount: "required|array",

                });

                const matched = await v.check()
                if (!matched) {
                    res.status(442)
                    res.json(v.errors);
                    return;
                }

                //Variable 
                let labor_json, equipment_json
                if ((labor_description.length == labor_amount.length) && (equipament_description.length == equipament_amount.length)) {
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

                    //Verify if this variable is a Array - Machine of pad printing process
                    if (Array.isArray(equipament_description)) {
                        equipment_json = `{`
                        for (let i = 0; i < equipament_description.length; i++) {
                            equipment_json += `"EQP${i}" : { "DESCRIPTION" : "${equipament_description[i]}" , "AMOUNT" : "${equipament_amount[i]}" }`
                            if ((i + 1) < equipament_description.length) {
                                equipment_json += ','
                            }
                        }
                        equipment_json += `}`
                    }

                    await ProcessAssembly.create(id, labor_json, equipment_json);

                    return;
                } else {


                    res.send({ msg: "Quantidade de Arrays Invalidos" })

                }

            } else {

                res.send({ msg: "Processo já preenchido" })

            }


        } else {
            res.status(404);
            res.json({ status: false, error: "Assembly Process not found" })
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

            // let resp = await ProcessPadPrinting.updatePCP
            let resp = await ProcessAssembly.updatePCP(status, comments, 'Luan Albuquerque', id);
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
      let {newlabor,newEquipment,idlabor} = req.body
      
      await ProcessAssembly.updateENG(id,JSON.stringify(newlabor),JSON.stringify(newEquipment),idlabor,0)
        }else{
 
         res.status(400);
         res.json({ status: false, error: "Parametro invalido!" });
         return;
 
        }
 
     }





}


module.exports = new ProcessAssemblyController()