'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Libros",
      "usuario_id_usuario",//duda
      {
          type: Sequelize.INTEGER,
          references: {
              model: "Usuarios",//duda
              key: "id"//duda
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Libro", "id_usuario");
  }
};
