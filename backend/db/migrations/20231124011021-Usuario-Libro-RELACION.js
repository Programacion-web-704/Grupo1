'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Libros",
      "usuario_id_usuario",
      {
          type: Sequelize.INTEGER,
          references: {
              model: "Usuarios",
              key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Libros", "usuario_id_usuario");
  }
};
