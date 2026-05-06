'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false
      },
      answer: {
        type: Sequelize.INTEGER,
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
      options: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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

    // Add index for better performance
    await queryInterface.addIndex('questions', ['quiz_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};