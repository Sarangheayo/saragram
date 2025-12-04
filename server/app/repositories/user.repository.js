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

export default {
  findByEmail,
  save,
  findByPk,
  create,
};

