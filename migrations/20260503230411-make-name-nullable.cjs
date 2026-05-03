'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // first_name column ko nullable banao
    await queryInterface.changeColumn('users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    // last_name column ko nullable banao
    await queryInterface.changeColumn('users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Wapas NOT NULL karne ke liye (rollback ke liye)
    await queryInterface.changeColumn('users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};