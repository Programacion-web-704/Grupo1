'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.addColumn(
      "Libros",  //crea la columna en esta tabla
      "editorial_id_editorial",  //foreign key
      {
          type: Sequelize.INTEGER,
          references: {
              model: "Editorials",
              key: "id" 
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
      }
    );


     
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Libros", "editorial_id_editorial");
 
  }
};
