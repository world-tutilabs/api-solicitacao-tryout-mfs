const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User{
    async findAll(){
        try {
            let result = knex.select("*").table('users');
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findAllTec(){
      try {
          let result = knex.select(["id","name","role"]).table('users').where({role : 1});
          return result;
      } catch (error) {
          console.log(error);
          return [];
      }
  }

    async findById(id){
        try {
            let result = knex.select(["id","name","email","registration","role"]).where({id:id}).table('users');
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async findByEmail(email){
        try {
             let aux;
             let result = await knex.select(["id","email","registration","role"]).where({email:email}).table('users');
             result.forEach(data =>{
                aux = data;
              });
            return aux;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async findByRegistration(registration){
        try {
            let aux;
            let result = await knex.select(["id","name","email","registration","password","role"]).where({registration:registration}).table('users');
            result.forEach(data =>{
                aux = data;
              });
            return aux; 
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async NewUser(name,email,password,registration){
        try {
            let newPassword = password.toString();
            let hash = await bcrypt.hash(newPassword,10);
            await knex.insert({email,password:hash,name,registration,role:0}).table('users');
        } catch (error) {
            console.log(error);
        }
    }

    async update(id,name,email,registration){
        try {
            let objUser = {name,email,registration};
            let result = knex('users').update(objUser).where({id:id});
            return result;
        } catch (error) {
            console.log(error);
            return {error:error}
        }
    }
    async deleteByUser(id){
        try {
            let result = knex('users').delete().where({id:id});
            return result;
        } catch (error) {
            console.log(error);
            return {error:error}
        }
    }

}
module.exports = new User();