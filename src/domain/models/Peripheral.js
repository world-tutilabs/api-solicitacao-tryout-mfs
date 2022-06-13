
const knex = require("../database/connection");


class Peripheral {

    async create(peripheralJson,id) {

        try {  
            

            let peripheralObj = {
                estufa : { radios : peripheralJson. desumifcador[0], time :peripheralJson.desumifcador[1],temp : peripheralJson.desumifcador[2] },  
                camera_quente: {  radios: peripheralJson.ccq[0], amount: peripheralJson.ccq[1], num_zones: peripheralJson.ccq[2] }, 
                sequenciador_injecao: {radios: peripheralJson.si[0],  amount:  peripheralJson.si[1],  num_zones:  peripheralJson.si[2]},        
                 aquecedor: {radios: peripheralJson.aquecedor[0],  amount:  peripheralJson.aquecedor[1]}
            }
          
           const pe = await knex('peripheral').insert({peripheral:JSON.stringify(peripheralObj),id_process:id});
           return pe;

        } catch (error) {
            console.log(error);
            return [];


        }
    }
}

module.exports = new Peripheral()