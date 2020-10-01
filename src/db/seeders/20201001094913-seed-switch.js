'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Switches', [{
      name: '1',
      state: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }, {
      name: '2',
      state: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }, {
      name: '3',
      state: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }, {
      name: '4',
      state: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Switches', null, {});
  }
};