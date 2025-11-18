/**
 * @file databases/migrations/20251118-08-fk-comments-user_id.js
 * @description add fk on comments-user_id.js
 * 251118 v1.0.0 sara init
 */

// 테이블명
const tableName = 'comments';

// constraint명 mysql이라 스네이크 기법
const constraintName = 'fk_comments_user_id';

// constraint 정의
const options = {
  fields: ['user_id'], // fk를 부여할 cloumn지정
  type: 'foreign key', // constraint 종류 중 1 택. 
  name: constraintName, // constraint 명 지정
  references: {
    table: 'users', // 참조할 테이블
    field: 'id', // 참조 컬럼 지정
  },
  onDelete: 'CASCADE', // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
};

/**
  @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(tableName, options);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, constraintName);
  }
};

