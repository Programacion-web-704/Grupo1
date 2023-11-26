'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn_libro: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      fecha_publicacion: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      paginas: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      editorial: {
        type: Sequelize.STRING
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('libros');
  }
};