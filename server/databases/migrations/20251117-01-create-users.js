/**
 * @file databases/migrations/20251117-01-create-users.js
 * @description users migration file
 * 251117 v1.0.0 sara init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'users';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'user PK',
  }, 
  email: {
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: 'email(login ID)'
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(255),
    // 512글자도 가능. 'passwordless service' 지향이기에 점점 없어짐.
    allowNull: false,
    // 1. 소셜 로그인한 유저에 한해 랜덤한 패스워드를 준다 or 2. null로 두는 방법
    comment: 'password',
  },
  nick: {
    field: 'nick',
    type: DataTypes.STRING(15),
    // varChar(10): 가변길이문자열
    // Char(10): 고정길이문자열// 불필요한 공백이 들어갈 수 있으니 비추천
    allowNull: false,
    unique: true,      
  },
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자(NONE, KAKAO, GOOGLE...)' 
    // orm 쪽에서 소셜미디어 쪽은 따로 정의해 둠
  },
  role: {
    field: 'role',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '유저 권한(NOMAL, SUPER...)'
  }, 
  profile: {
    field: 'profile',
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'user profile',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'refresh token',
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
  collate: 'utf8mb4_bin', // 정렬 방식 설정 (영어 대소문자 구분 정렬)
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

