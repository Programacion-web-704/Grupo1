'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [{
      dni: 12345678,
      nombres: 'Usuario de Prueba',
      apellidos: 'Apellido de Prueba',
      tipo: 'Normal',
      correo: 'prueba@ejemplo.com',
      sexo: 'Masculino',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
