'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      quiz_id: {
        type: Sequelize.INTEGER,  // BIGINT se INTEGER
        allowNull: false,
        references: {
          model: 'quizes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,  // BIGINT se INTEGER
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    // Add composite indexes for better performance
    await queryInterface.addIndex('results', ['quiz_id', 'user_id']);
    await queryInterface.addIndex('results', ['user_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('results');
  }
};