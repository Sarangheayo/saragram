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

export default {
  findByEmail,
  save
};
