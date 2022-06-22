const knex = require('../database/connection')
const labor = require('./Labor')
const equipment = require('./Equipment')

class ProcessAssembly{

    async create(id,labor_json,equipament_json){

        try {
            let labor = await knex('labor').insert({ labor: labor_json, id_process: id }).then(row => {return row[0]}).catch(error => {
                console.log(error);
                return false;
            });
                     
            console.log(labor)
            
            return await knex('assembly_process').update({ id_labor: labor, equipment: equipament_json }).where({ id: id })

        } catch (error) {

            
        }


    }


    async findByEditProcess(id) {
        try {
            const result = await knex('assembly_process').count('*', { as: "row" }).where({ id: id, id_labor: null, equipment: null });
            return result[0].row;
        } catch (error) {
            console.log(error);
            return error;
        }

    }

    async updatePCP(status,comments,author,id){

        try {
           
            let result = await knex('assembly_process').update({ status_pcp: status,comments_pcp: comments,last_update_pcp: null, author_pcp:author }).where({ id_tryout : id })

            return result;

        } catch (error) {
            console.log(error);
            return [];
        }


    }

    
    async updateENG(idPP,newListLabor,newListEQP,idLabor,status){

      try {
 
          await labor.updateLabor(idLabor,newListLabor)
          let newJsonEqp = await equipment.updateEQP(newListEQP)

           let result = await knex('assembly_process').update({equipment: newJsonEqp, status_pcp: status }).where({ id_tryout : idPP });
          return result;

      } catch (error) {
          console.log(error);
          return [];
      }


  }


        
}

module.exports = new ProcessAssembly();