/**
 * @file databases/migrations/20251118-11-fk-likes-post_id.js
 * @description add fk on likes-post_id.js
 * 251118 v1.0.0 sara init
 */

const tableName = 'likes';
const constraintName = 'fk_likes_post_id';

const options = {
  fields: ['post_id'],
  type: 'foreign key',
  name: constraintName,
  references: {
    table: 'posts',
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


