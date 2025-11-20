/**
 *  @file app/models/User.js
 *  @description user model
 *  251120 v1.0.0 sara init 
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'User'; // 모델명(js 내부에서 사용)

// 
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
    get() {
      const val = this.getDataValue('createAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '수정일',
        get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '삭제일',
        get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }
  }
};

// 모델에서 맵핑을 할때 다루는 속성이라 migration과는 다름 
const options = {
  tableName: 'users', // 실제 DB 테이블 명
  timestamps: true, // createdAt, updatedAt을 자동 관리
  paranoid: true, // soft delete 설정 (deletedAt 자동 관리)
}

const User = {
  init: (sequelize) => { 
    const define = sequelize.define(modelName, attributes, options); 
    // define = new Model = 새로 만든 모델 객체
    
    // JSON으로 serialize 시, 제외할 컬럼을 지정 가능
    define.prototype.toJSON = function() {
      const attributes = this.get();
      delete attributes.password;
      delete attributes.refreshToken;
      
      return attributes;
    }
    return define;
  },
  associate: (db) => {
  
  },
}

export default User;