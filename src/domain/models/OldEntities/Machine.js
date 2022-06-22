
const knex = require("../database/connection");


class Machine {

    async create(MachineJson) {

        try {  
            let machine_json = '{ "MACHINE" : [';
            
            MachineJson.map((item,index) =>{

                        machine_json += `{ "ID_MACHINE" : "${item[0]}" , "AMOUNT" : "${item[1]}" }`
                        if ((index + 1) < MachineJson.length) {
                            machine_json += ','
                        }       

            })
            machine_json += `]}`
          
            return machine_json;


        } catch (error) {
            console.log(error);
            return [];


        }
    }

    async updateMachine(newList){

        let machine_json = `{  "MACHINE" : ${newList} }`;
       

      return machine_json;

   }
}

module.exports = new Machine()