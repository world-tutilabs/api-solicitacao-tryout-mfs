
const knex = require("../database/connection");


class Labor {
//Modelo de salvamento de mao de obra no banco
    async create(laborJson) {

        try {  
            let labor_json = '{  "LABOR" : [';
            
            laborJson.map((item,index) =>{

                labor_json += `{ "DESCRIPTION" : "${item[0]}" , "AMOUNT" : "${item[1]}" }`
                         if ((index + 1) < laborJson.length) {
                             labor_json += ','
                         }
            })
                 labor_json += `]}`
           
   
               let labor = await knex('labor').insert({ labor: labor_json, id_process: 2 }).then(row => {return row[0]}).catch(error => {
                 console.log(error);
                 return false;
             });

            return labor;


        } catch (error) {
            console.log(error);
            return [];


        }
    }
//Mudanças de labor
    async updateLabor(id,newList){

         let labor_json = `{  "LABOR" : ${newList} }`;
  
        let labor = await knex('labor').update({ labor: labor_json, id_process: 2 }).where({id:id})

       return labor;

    }
}

module.exports = new Labor()