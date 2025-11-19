/**
 * @file databases/migrations/20251118-12-fk-notifications-user_id.js
 * @description add fk on notifications-user_id.js
 * 251118 v1.0.0 sara init
 */

const tableName = 'notifications';
const constraintName = 'fk_notifications_user_id';

const options = {
  fields: ['user_id'],
  type: 'foreign key',
  name: constraintName,
  references: {
    table: 'users',
    field: 'id',
  },
  onDelete: 'CASCADE',
};

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(tableName, options);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, constraintName);
  }
};

