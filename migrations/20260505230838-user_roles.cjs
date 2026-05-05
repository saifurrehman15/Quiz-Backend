'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      role_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    }
    )

    await queryInterface.addIndex('user_roles', ['user_id']);
    await queryInterface.addIndex('user_roles', ['role_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_roles');
  }
};
