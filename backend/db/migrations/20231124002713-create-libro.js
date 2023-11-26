'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      isbn: {
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      fecha_publicacion: {
        type: Sequelize.DATE
      },
      genero: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      paginas: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Libros');
  }
};