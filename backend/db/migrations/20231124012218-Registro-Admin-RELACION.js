'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Admins",
      "registro_id_registro",
      {
          type: Sequelize.INTEGER,
          references: {
              model: "Registros",
              key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
      }
  );
   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn( "Admins", "registro_id_registro");
  }
};
