const con = require('../libs/sequelize');

class ConceptosService{
  
    constructor(){

    }
    async find() {
        const data = await con.models.conceptos.findAll()
        return data;
      }
    
    async findOne(id) {
    
        const rta = await con.models.conceptos.findByPk(id);
        if(!rta){
          throw console.error('no se encontro');
        }
        return rta;
      }
}


  module.exports= ConceptosService;