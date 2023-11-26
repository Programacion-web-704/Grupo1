'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Libro.belongsTo(models.Editorial, { foreignKey: 'editorial_id_editorial' });
      Libro.hasOne(models.Registro, { foreignKey: 'libro_id_libro' });
    }
  }
  Libro.init({
    
    isbn: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    fecha_publicacion: DataTypes.DATE,
    genero: DataTypes.STRING,
    idioma: DataTypes.STRING,
    paginas: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Libro',
  });
  return Libro;
};
