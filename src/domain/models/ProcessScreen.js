const knex = require('../database/connection');
const labor = require('./Labor')

class ProcessScreen {
 async create(id, labor_json){
        
        try {
            let receive_idLabor = await knex('labor').insert({labor: labor_json, id_process: id})
            .then(row => {
                return row[0]
            })
            .catch(error => {
                console.log(error);
                return false;
            })
                console.log(receive_idLabor);

            return await knex('screen_process').update({id_labor: receive_idLabor}).where({id: id,id_labor: null})
        } catch (error) {
            console.log(error);
                return false;
        }

        return;
    } 

    async updatePCP(status,comments,author,id){

        try {
           
            let result = await knex('screen_process').update({ status_pcp: status,comments_pcp: comments,last_update_pcp: null, author_pcp:author }).where({ id_tryout : id })

            return result;

        } catch (error) {
            console.log(error);
            return [];
        }


    }

    async updateENG(idPP,newListLabor,idLabor,status){
      try {
   
        await labor.updateLabor(idLabor,newListLabor)
    
         let result = await knex('screen_process').update({status_pcp: status }).where({ id_tryout : idPP });
        return result;

    } catch (error) {
        console.log(error);
        return [];
    }


    }

}

module.exports = new ProcessScreen();