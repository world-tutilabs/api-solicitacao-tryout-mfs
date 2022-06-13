const knex = require("../database/connection");
const labor = require("./Labor");
const machine = require("./Machine");
const equipment = require("./Equipment");
const peripheral = require("./Peripheral");
const httpHelper = require('../helpers/http-helper')
class Tryout {
  create(code_sap, product_description, client, date, reason) {
    let result = knex("tryout")
      .insert([{ code_sap, product_description, client, date, reason }])
      .then((row) => {
        return row[0];
      })
      .catch((error) => {
          console.log('error', error.stack)
        //   const errorServe =  httpHelper.serverError(error)
      
        // return errorServe;
      });
    // return result;
  }

  async findById(id) {
    try {
      let result = knex("tryout").select().where({ id });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create_tryout_process(id, process, amount, office) {
    try {
      let result = knex("tryout_process").insert({
        id_tryout: id,
        id_process: process,
        amount: amount,
        office: office,
      });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Insert default of process
  async create_Fk_process(id, process, ObjProcess) {
    try {
      let idLabor, jsonCriado;

      switch (process) {
        case 1:
          idLabor = await labor.create(ObjProcess.injection.inforger.maodeobra);
          let ip = await knex("injection_process").insert({
            id_tryout: id,
            id_process: process,
            id_labor: idLabor,
            id_mold: 1,
            id_machine: 1,
          });
          let p = peripheral.create(ObjProcess.injection.perifericos, ip[0]);

          return p;
          break;

        case 2:
          idLabor = await labor.create(ObjProcess.tampografia.ListMaoObra);
          jsonCriado = await machine.create(ObjProcess.tampografia.ListMaquina);
          await knex("padprinting_process").insert({
            id_tryout: id,
            id_process: process,
            labor: idLabor,
            machine: jsonCriado,
          });
          return;

          break;

        case 3:
          idLabor = await labor.create(ObjProcess.serigrafia.ListMaoObra);
          return knex("screen_process").insert({
            id_tryout: id,
            id_process: process,
            id_labor: idLabor,
          });
          break;

        case 4:
          idLabor = await labor.create(ObjProcess.impressao.ListMaoObra);
          jsonCriado = await machine.create(ObjProcess.impressao.ListMaquina);
          return await knex("UV_printing_process").insert({
            id_tryout: id,
            id_process: process,
            id_labor: idLabor,
            machine: jsonCriado,
          });
          break;

        case 5:
          idLabor = await labor.create(ObjProcess.pintura.ListMaoObra);
          return knex("painting_process").insert({
            id_tryout: id,
            id_process: process,
            id_labor: idLabor,
          });
          break;

        case 6:
          idLabor = await labor.create(ObjProcess.montagem.ListMaoObra);
          jsonCriado = await equipment.create(
            ObjProcess.montagem.ListEquipamentos
          );
          return knex("assembly_process").insert({
            id_tryout: id,
            id_process: process,
            id_labor: idLabor,
            equipment: jsonCriado,
          });
          break;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findByCodeSap() {
    try {
      let result = knex("sap")
        .innerJoin("product", "sap.id_product", "product.id")
        .innerJoin("client", "product.client", "client.id");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async update(
    code_sap,
    product_description,
    client,
    date,
    reason,
    process,
    amount,
    office,
    id
  ) {
    try {
      let result = knex("tryout")
        .update({
          code_sap,
          product_description,
          client,
          date,
          reason,
          process,
          amount,
          office,
        })
        .where({ id });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async findAll() {
    try {
      let result = knex.select("*").table("tryout");

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async delete(id) {
    try {
      let result = knex("tryout").delete().where({ id });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async findByProcessAll() {
    try {
      let result = knex("process").select("*");
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Fase Teste - Buscas de Tryout Completo
  async findByAllTryout() {
    try {
      let result = await knex.raw(`CALL view_tryout()`);
      return result[0][0];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findByTryout(id) {
    try {
      let result = await knex.raw(`CALL findby_tryout(${id})`);
      return result[0][0];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findOfficeAll() {
    try {
      let result = await knex("office").select("*");
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //Buscar Motivo
  async findReason() {
    try {
      let result = await knex("reason_api").select("*");
      // console.log(result)
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateStatusTryout(id, status,newdata) {
    try {
      let result = await knex("tryout")
        .update({ status: status , date : newdata })
        .where({ id });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async reprogramStatusTryOut(id) {
    try {
      const result = await knex("tryout").update({ status: 1 }).where({ id });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = new Tryout();
