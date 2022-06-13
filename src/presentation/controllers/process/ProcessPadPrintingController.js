const ProcessPadPrinting = require("../../models/ProcessPadPrinting");
const { Validator } = require("node-input-validator");
const { json } = require("body-parser");

class ProcessPadPrintingController {

    async create(req, res) {
        let id = parseInt(req.params.id);
        if (Number.isInteger(id)) {

            if (id <= 0) {
                res.status(400);
                res.json({ status: false, error: "Parametro invalido!" });
                return;

            } else {

                let { machine, machine_amount, labor_description, labor_amount } = req.body;

                //Verify validation this data
                const v = new Validator(req.body, {

                    machine: 'required',
                    machine_amount: 'required',
                    labor_description: 'required',
                    labor_amount: 'required',

                });

                let matched = await v.check();
                if (!matched) {
                    res
                        .status(442)
                        .json(v.errors);
                    return;
                }

                //Variable 
                let labor_json, machine_json

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
                if (Array.isArray(machine)) {
                    machine_json = `{`
                    for (let i = 0; i < machine.length; i++) {
                        machine_json += `"MAQ${i}" : { "ID_MACHINE" : "${machine[i]}" , "AMOUNT" : "${machine_amount[i]}" }`
                        if ((i + 1) < machine.length) {
                            machine_json += ','
                        }
                    }
                    machine_json += `}`
                }



                await ProcessPadPrinting.create(labor_json, machine_json, id);

                // console.log (labor_json)
                // console.log(machine_json)

                return;

            }
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

            let resp = await ProcessPadPrinting.updatePCP(status, comments, 'Luan Albuquerque', id)
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
     
     await ProcessPadPrinting.updateENG(id,JSON.stringify(newlabor),JSON.stringify(newmachine),idlabor,0)
       }else{

        res.status(400);
        res.json({ status: false, error: "Parametro invalido!" });
        return;

       }

    }




}


module.exports = new ProcessPadPrintingController()