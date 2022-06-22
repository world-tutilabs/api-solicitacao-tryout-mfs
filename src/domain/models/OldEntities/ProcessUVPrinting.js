const knex = require('../database/connection')
const labor = require('./Labor')
const machine = require('./Machine')

class ProcessUVPrinting {


    async create(id, labor_json, machine) {
        try {

            let labor = await knex('labor').insert({ labor: labor_json, id_process: id }).then(row => { return row[0] })
                .catch(error => {
                    console.log(error);
                    return false;
                })

            return await knex('UV_printing_process').update({ id_labor: labor, id_machine: machine }).where({ id: id })

        } catch (error) {
            console.log(error);
            return error;
        }


    }

    async findByEditProcess(id) {
        try {
            const result = await knex('UV_printing_process').count('*', { as: "row" }).where({ id: id, id_labor: null, id_machine: null });
            return result[0].row;
        } catch (error) {
            console.log(error);
            return error;
        }

    }

    async updatePCP(status,comments,author,id){

        try {
           
            let result = await knex('UV_printing_process').update({ status_pcp: status  , comments_pcp: comments,last_update_pcp: null, author_pcp:author }).where({ id_tryout : id })

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

           let result = await knex('UV_printing_process').update({machine: newJsonmachine, status_pcp: status }).where({ id_tryout : idPP });
          return result;

      } catch (error) {
          console.log(error);
          return [];
      }


  }




}

module.exports = new ProcessUVPrinting()