const Tryout = require("../../models/Tryout");
const ProcessInjection = require("../../models/ProcessInjection");
const { Validator } = require('node-input-validator');

class ProcessInjectionController {
    async create(req, res) {
        let id = parseInt(req.params.id);


        if (Number.isInteger(id)) {
            if (id <= 0) {
                res.status(400);
                res.json({ status: false, error: "Parametro invalido!" });
                return;
            } else {
                let { labor_description, labor_amount, num_cavity, mold, machine, cod_feedstock, feedstock_description, stove, hot_chamber, injection_sequencer, heater } = req.body;
                const v = new Validator(req.body, {
                    labor_description: 'required|array',
                    labor_amount: 'required|array',
                    num_cavity: 'required|integer|min:0',
                    mold: 'required|maxLength:250',
                    machine: 'required|maxLength:250',
                    cod_feedstock: 'required|maxLength:250',
                    feedstock_description: 'required|maxLength:250',
                });

                const matched = await v.check();

                if (!matched) {
                    res.status(422);
                    res.json(v.errors);
                    return;
                }

                const vObj = new Validator(
                    {
                        stove: stove,
                        hot_chamber: hot_chamber,
                        injection_sequencer: injection_sequencer,
                        heater: heater
                    },
                    {
                        'stove': 'required|object',
                        'stove.radios': 'required|boolean',
                        'stove.time': 'required|integer',
                        'stove.temperature': 'required|integer',
                        'hot_chamber': 'required|object',
                        'hot_chamber.radios': 'required|boolean',
                        'hot_chamber.amount': 'required|integer|between:1,99',
                        'hot_chamber.num_zones': 'required|integer',
                        'injection_sequencer': 'required|object',
                        'injection_sequencer.radios': 'required|boolean',
                        'injection_sequencer.amount': 'required|integer|between:1,99',
                        'injection_sequencer.num_zones': 'required|integer',
                        'heater': 'required|object',
                        'heater.radios': 'required|boolean',
                        'heater.amount': 'required|integer|between:1,99',
                    },
                );
                const matchedObj = await vObj.check();
                if (!matchedObj) {
                    res.status(422);
                    res.json(vObj.errors);
                    return;
                }
                let ProcessInjectionExist = await ProcessInjection.findByProcess(id);
                if (ProcessInjectionExist.length > 0) {

                    let laborObj = {
                        labor_description,
                        labor_amount
                    }
                    let peripheralObj = {
                        "estufa": stove, "camera_quente": hot_chamber, "sequenciador_injecao": injection_sequencer, "aquecedor": heater
                    }
                    let ValidExistLabor = await ProcessInjection.findByLabor(id);
                    if(ValidExistLabor.length === 0){
                        let result = await ProcessInjection.create(laborObj,peripheralObj,id);
                    if (result) {
                        res.status(200);
                        res.json({ status: true, msg: "Processo de Injeção Cadastrado com Sucesso!" });
                    } else {
                        res.status(400);
                        res.json({ status: false, error: "Falha ao Tentar Cadastrar!!" });
                    }
                    }else{
                        res.status(400);
                        res.json({status:false,error:"Processo Já está cadastrado!"});
                    }
                } else {
                    res.status(404);
                    res.json({ status: false, error: "Processo Não encontrado!" });
                }
            }
            
        } else {
            res.status(400);
            res.json({ status: false, error: "Parametro invalido!" });
            return;
        }

    }
    async edit(req, res) {
        let id = parseInt(req.params.id);
        if (Number.isInteger(id)) {
            if (id <= 0) {
                res.status(400);
                res.json({ status: false, error: "Parametro invalido!" });
                return;
            } else {
                let { labor_description, labor_amount, num_cavity, mold, machine, cod_feedstock, feedstock_description, stove, hot_chamber, injection_sequencer, heater } = req.body;
                const v = new Validator(req.body, {
                    labor_description: 'required|array',
                    labor_amount: 'required|array',
                    num_cavity: 'required|integer|min:0',
                    mold: 'required|maxLength:250',
                    machine: 'required|maxLength:250',
                    cod_feedstock: 'required|maxLength:250',
                    feedstock_description: 'required|maxLength:250',
                });

                const matched = await v.check();

                if (!matched) {
                    res.status(422);
                    res.json(v.errors);
                    return;
                }

                const vObj = new Validator(
                    {
                        stove: stove,
                        hot_chamber: hot_chamber,
                        injection_sequencer: injection_sequencer,
                        heater: heater
                    },
                    {
                        'stove': 'required|object',
                        'stove.radios': 'required|boolean',
                        'stove.time': 'required|integer',
                        'stove.temperature': 'required|integer',
                        'hot_chamber': 'required|object',
                        'hot_chamber.radios': 'required|boolean',
                        'hot_chamber.amount': 'required|integer|between:1,99',
                        'hot_chamber.num_zones': 'required|integer',
                        'injection_sequencer': 'required|object',
                        'injection_sequencer.radios': 'required|boolean',
                        'injection_sequencer.amount': 'required|integer|between:1,99',
                        'injection_sequencer.num_zones': 'required|integer',
                        'heater': 'required|object',
                        'heater.radios': 'required|boolean',
                        'heater.amount': 'required|integer|between:1,99',
                    },
                );
                const matchedObj = await vObj.check();
                if (!matchedObj) {
                    res.status(422);
                    res.json(vObj.errors);
                    return;
                }
                let ProcessInjectionExist = await ProcessInjection.findByProcess(id);
                if (ProcessInjectionExist.length > 0) {
                    let laborObj = {
                        labor_description,
                        labor_amount
                    }
                    let peripheralObj = {
                        "estufa": stove, "camera_quente": hot_chamber, "sequenciador_injecao": injection_sequencer, "aquecedor": heater
                    }
                    let ValidExistLabor = await ProcessInjection.findByLabor(id);
                    if(ValidExistLabor.length != 0){
                         await ProcessInjection.update(laborObj,peripheralObj,id);
                        let result = true;
                    if (result) {
                        res.status(200);
                        res.json({ status: true, msg: "Processo de Injeção Cadastrado com Sucesso!" });
                    } else {
                        res.status(400);
                        res.json({ status: false, error: "Falha ao Tentar Cadastrar!!" });
                    }
                    }else{
                        res.status(400);
                        res.json({status:false,error:"Processo Já está cadastrado!"});
                    }
                } else {
                    res.status(404);
                    res.json({ status: false, error: "Processo Não encontrado!" });
                }
            }
        } else {
            res.status(400);
            res.json({ status: false, error: "Parametro invalido!" });
            return;
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

        // 
        let resp = await ProcessInjection.updatePCP(status, comments, 'Luan Albuquerque', id);
        console.log(resp)
        return resp;

    } else {

        res.status(400);
        res.json({ status: false, error: "Parametro invalido!" });
        return;


    }

}
}

module.exports = new ProcessInjectionController();