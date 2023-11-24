'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Editorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Editorial.init({
    
    descripcion: DataTypes.STRING,
    fecha_fundacion: DataTypes.DATE,
    sitio_web: DataTypes.STRING,
    telefono: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Editorial',
  });
  return Editorial;
};