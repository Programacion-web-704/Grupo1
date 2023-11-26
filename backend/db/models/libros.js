'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class libros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.reservas,{as:'reservas',foreignKey:'libroId'})
    }
  }
  libros.init({
    isbn_libro: DataTypes.STRING,
    titulo: DataTypes.STRING,
    fecha_publicacion: DataTypes.STRING,
    genero: DataTypes.STRING,
    idioma: DataTypes.STRING,
    paginas: DataTypes.STRING,
    stock: DataTypes.STRING,
    autor: DataTypes.STRING,
    estado: DataTypes.STRING,
    editorial: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'libros',
  });
  return libros;
};