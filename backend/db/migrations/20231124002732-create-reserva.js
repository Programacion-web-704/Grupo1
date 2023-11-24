'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      nombres_cliente: {
        type: Sequelize.STRING
      },
      apellidos_cliente: {
        type: Sequelize.STRING
      },
      fecha_reserva: {
        type: Sequelize.DATE
      },
      importe: {
        type: Sequelize.INTEGER
      },
      precio_final: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservas');
  }
};