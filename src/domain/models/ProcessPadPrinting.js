
const knex = require("../database/connection");
const labor = require('./Labor')
const machine = require('./Machine')



class ProcessPadPrinting {

    async create(laborJson, machine, id) {

        try {

         
             let labor = await knex('labor').insert({ labor: laborJson, id_process: 2 }).then(row => {return row[0]}).catch(error => {
                console.log(error);
                return false;
            });

            console.log(labor);

            let result = await knex('padprinting_process').update({ labor: labor  , machine: machine }).where({ id : id })
           
            console.log(result)
            
            return result;

        } catch (error) {
            console.log(error);
            return [];


        }
    }

    async updatePCP(status,comments,author,id){

        try {
           
            let result = await knex('padprinting_process').update({ status_pcp: status  , comments_pcp: comments,last_update_pcp: null, author_pcp:author }).where({ id_tryout : id })

            return result;

        } catch (error) {
            console.log(error);
            return [];
        }


    }


    async updateENG(idPP,newListLabor,newListMachine,idLabor,status){

        try {
   
            await labor.updateLabor(idLabor,newListLabor)
            let newJsonmachine = await machine.updateMachine(newListMachine)

             let result = await knex('padprinting_process').update({machine: newJsonmachine, status_pcp: status }).where({ id_tryout : idPP });
            return result;
  
        } catch (error) {
            console.log(error);
            return [];
        }


    }
}

module.exports = new ProcessPadPrinting();
