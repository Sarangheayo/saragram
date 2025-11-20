/**
 *  @file app/models/Like.js
 *  @description like model
 *  251120 v1.0.0 sara init 
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Likes';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'likes PK',
  }, 
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: 'user PK',
  },
  postId: {
    field: 'post_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: 'post ID'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '작성일',
    get() {
      const val = this.getDataValue('createdAt');
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
  tableName: 'likes', // 실제 DB 테이블 명
  timestamps: true, // createdAt, updatedAt을 자동 관리
  paranoid: true, // soft delete 설정 (deletedAt 자동 관리)
}

const Like = {
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
  db.Like.belongsTo(db.User, { targetKey: 'userId', foreignKey: 'userId', as: 'user' }); // User모델과의 관계

  db.Like.belongsTo(db.Post, { targetKey: 'postId', foreignKey: 'postId', as: 'post' }); // Post모델과의 관계
  }
};

export default Like;