'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reserva.belongsTo(models.Libro, { foreignKey: 'libro_id_libro' });
      Reserva.belongsTo(models.Usuario, { foreignKey: 'usuario_id_usuario' });
    }
  }
  Reserva.init({
    
    nombres_cliente: DataTypes.STRING,
    apellidos_cliente: DataTypes.STRING,
    fecha_reserva: DataTypes.DATE,
    importe: DataTypes.INTEGER,
    precio_final: DataTypes.INTEGER,
    estado: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};
