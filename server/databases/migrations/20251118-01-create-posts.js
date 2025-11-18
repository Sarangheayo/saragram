/**
 * @file databases/migrations/20251118-01-create-posts.js
 * @description posts migration file
 * 251118 v1.0.0 sara init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'posts';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'post PK',
  }, 
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: 'user PK',
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'content',
  },
  image: {
    field: 'image',
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    comment: 'post image',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '작성일',
    },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '수정일',
    },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '삭제일',
  }
};

// 옵션 설정
const options = {
  charset: 'utf8mb4',     // 테이블의 문자셋 설정 (이모지도 지원)
  collate: 'utf8mb4_0900_ai_ci', // 정렬 방식 설정 (기본 설정) // utf8mb4_bin -> 이거는 binary 대소문자 구분하는 애임 
  engine: 'InnoDB'        // 사용 엔진 설정
};

/**
  @type {import('sequelize-cli').Migration} */
export default {
  // migration 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, attributes , options);
  },
  // migration rollback 시 호출되는 메소드 = like undo(스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable(tableName);
 }
};

