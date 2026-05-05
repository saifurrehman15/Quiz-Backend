'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cheated', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Press Key'
      },
      attemp_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('cheated', ['user_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cheated');
  }
};
