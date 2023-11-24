'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.addColumn(
      "Libros",
      "editorial_id_editorial",  //duda
      {
          type: Sequelize.INTEGER,
          references: {
              model: "Editorials",//duda
              key: "id" //duda
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
