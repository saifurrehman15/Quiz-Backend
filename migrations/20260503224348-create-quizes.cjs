'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      quiz_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quiz_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subject_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      quiz_key: {
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

    // Add index for better query performance
    await queryInterface.addIndex('quizes', ['subject_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quizes');
  }
};