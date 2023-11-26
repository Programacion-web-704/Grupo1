'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Reservas",
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
    return queryInterface.removeColumn("Reservas", "usuario_id_usuario");

  }
};
