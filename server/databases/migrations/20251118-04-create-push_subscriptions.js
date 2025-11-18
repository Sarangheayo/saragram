/**
 * @file databases/migrations/20251118-04-create-push_subscriptions.js
 * @description push-subscriptions migration file
 * 251118 v1.0.0 sara init
 */

import { DataTypes, DATE } from 'sequelize';

// 테이블명
const tableName = 'push_subscriptions';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'notifications PK',
  }, 
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: 'user PK',
  },
  endPoint: {
    field: 'end_point',
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    comment: 'push-subscriptions end_point'
    // user마다 다 값이 달라야함. 1과 2의 값을 구분하여 데이터 이상을 막음 
    // end_point 도메인으로 올 거라 값 넉넉히 255
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

