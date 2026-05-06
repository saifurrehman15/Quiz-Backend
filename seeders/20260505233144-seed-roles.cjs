'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if roles already exist to avoid duplicates
    const [existingRoles] = await queryInterface.sequelize.query(
      `SELECT * FROM roles WHERE name IN ('admin', 'user')`
    );
    
    if (existingRoles.length === 0) {
      await queryInterface.bulkInsert('roles', [
        {
          name: 'admin',
          created_at: new Date(),  // ✅ Use new Date()
          updated_at: new Date()   // ✅ Use new Date()
        },
        {
          name: 'user',
          created_at: new Date(),  // ✅ Use new Date()
          updated_at: new Date()   // ✅ Use new Date()
        }
      ]);
      console.log('✅ Roles seeded successfully');
    } else {
      console.log('⚠️ Roles already exist, skipping seed');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', {
      name: ['admin', 'user']
    });
  }
};