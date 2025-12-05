/**
 * @file app/repositories/user.repository.js 
 * @description User repository
 * 251120 v1.0.0 sara init 
 */

import db from '../models/index.js';
const { User } = db;

//t = transaction

   /**
    * 이메일로 유저 검색 = email
    * @param {import("sequelize").Transaction} t 
    * @param {string} email 
    * @returns 
    */
  async function findByEmail(t = null, email) {
   return await User.findOne(
     {
      where: {
        email: email
      },
      transaction: t
    }
  );
}

   /**
    * nick 
    * @param {import("sequelize").Transaction} t 
    * @param {string} nick
    * @returns 
    */
  async function findByNick(t = null, nick) {
   return await User.findOne(
     {
      where: {
        nick: nick
      },
      transaction: t
    }
  );
}

/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js").User} user 
 * @returns 
 */
async function save(t = null, user) {
return await user.save({ transaction: t });
}

/**
 * 유저 id로 유저 정보 조회
 * @param {import("sequelize").Transaction} t 
 * @param {number} id
 * @returns {Promise<import("../models/User.js").User>}
 */
async function findByPk(t = null, id) {
  // pk로 유저 검색
  return await User.findByPk(id, { transaction: t });
  // 첫번째 인자: PK 값, 두 번째 인자: 옵션 (트랜잭션 포함)
}

async function create(t = null, data) {
  return await User.create(data, { transaction: t });
}

async function logout(t = null, id) {
 return await User.update(
  {
    refreshToken: null
  },
  {
    where: {
      id: id
    },
    transaction: t
  }
 );
 
  // 특정 유저 리프래시 토큰 null로 갱신
  // UPDATE users SET refresh_token = null, updated_at = NOW() WHERE id = ?
// const query =
//   ' UPDATE users ' 
//   + ' SET ' 
//   + '   refresh_token = null ' 
//   + ' , updated_at = NOW() ' 
//   + ' WHERE ' 
//   + '   id = ? '
// ;

// const values = [id];

// db.sequelize.query({ query, values });
}

export default {
  findByEmail,
  save,
  findByPk,
  create,
  logout,
  findByNick,
}

