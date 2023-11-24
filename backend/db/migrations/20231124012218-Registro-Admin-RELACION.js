'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Registros",
      "id_registro",
      {
          type: Sequelize.INTEGER,
          references: {
              model: "Admins",
              key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
      }
  );
   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Registro", "id_registro");
  }
};
