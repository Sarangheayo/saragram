/**
 *  @file app/models/PushSubscription.js
 *  @description push_subscription model
 *  251120 v1.0.0 sara init 
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'PushSubscription';

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
  tableName: 'push_subscriptions', // 실제 DB 테이블 명
  timestamps: true, // createdAt, updatedAt을 자동 관리
  paranoid: true, // soft delete 설정 (deletedAt 자동 관리)
}

const PushSubscription = {
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
   // user가 부모, push_subscriptio가 자식인 1:1 관계
   db.PushSubscription.belongsTo(db.User, { targetKey: 'userId', foreignKey: 'userId', as: 'push_subscription' }); // User모델과의 관계
  }
};

export default PushSubscription;