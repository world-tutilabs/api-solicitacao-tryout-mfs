const knex = require("../database/connection");
class ProcessInjection{

    create(laborObj,peripheralObj,id){
            const laborJson = JSON.stringify(laborObj);
            const peripheralJson = JSON.stringify(peripheralObj);
            let result = knex('labor').insert({labor:laborJson,id_process:id}).then(async row => {
                try {
                    await knex('peripheral').insert({peripheral:peripheralJson,id_process:id});
                } catch (error) {
                    console.log(error);
                    return false;
                }
                let injection_process =  knex('injection_process').update({id_labor:row[0]});
                
                return injection_process;
           
        }).catch(error => {
            console.log(error);
            return error;
        });
        return result;
    }

    async findByProcess(id){

        try {
            let result = knex('injection_process').select("*").where({ id });
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async findByLabor(id){
        try {
            let result = knex('labor').select("*").where({ id_process: id });
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(labor_description, labor_amount, num_cavity, mold, machine, cod_feedstock, feedstock_description, stove, hot_chamber, injection_sequencer, heater){
        console.log(`labor_description ${labor_description}, labor_amount ${labor_amount}, num_cavity ${num_cavity}, mold ${mold}, machine ${machine}, cod_feedstock ${cod_feedstock}, feedstock_description ${feedstock_description}, stove ${stove}, hot_chamber ${hot_chamber}, injection_sequencer ${injection_sequencer}, heater ${heater}`);
    }

    async updatePCP(status,comments,author,id){

        try {
           
            let result = await knex('injection_process').update({ status_pcp: status,comments_pcp: comments,last_update_pcp: null, author_pcp:author }).where({ id_tryout : id })

            return result;

        } catch (error) {
            console.log(error);
            return [];
        }


    }

}

module.exports = new ProcessInjection();