
const knex = require("../database/connection");


class Equipment {

    async create(EquipmentJson) {

        try {  
            let Equipment_json = '{ "EQP" : [';
            
            EquipmentJson.map((item,index) =>{

                     Equipment_json += `{ "DESCRIPTION" : "${item[0]}" , "AMOUNT" : "${item[1]}" }`
                        if ((index + 1) < EquipmentJson.length) {
                            Equipment_json += ','
                        }       

            })
            Equipment_json += `]}`

            return Equipment_json;


        } catch (error) {
            console.log(error);
            return [];


        }
    }
    async updateEQP(newList){

      let Equipment_json = `{  "EQP" : ${newList} }`;
     

    return Equipment_json;

 }
}

module.exports = new Equipment()