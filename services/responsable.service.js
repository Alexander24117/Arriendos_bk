const con = require('../libs/sequelize');

class Responsable{

  constructor(){

  }

  async create(data) {
    const newResponsable = await con.models.responsable.create(data);
    return newResponsable;
  }

  async find() {
    const data = await con.models.responsable.findAll();
    return data;
  }

  async findOne(id) {

    const rta = await con.models.responsable.findByPk(id);
    if(!rta){
      throw console.error('no se encontro');
    }
    return rta;
  }

  async update(id, changes) {

    const upResponsable =  await this.findOne(id);

    const rta = await upResponsable.update(changes);

    return rta;
  }

  async delete(id) {
    const delResponsable =  await this.findOne(id);
    await delResponsable.destroy()
    return 'eliminado'
  }

}
module.exports = Responsable;
