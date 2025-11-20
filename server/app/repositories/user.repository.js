/**
 * @file app/repositories/user.repository.js 
 * @description User repository
 * 251120 v1.0.0 sara init 
 */

import db from '../models/index.js';
const { User } = db;

//t = transaction
  async function findByEmail(t = null, email) {
   return await User.findOne(
     {
      where: {
        email: email
      } 
     },
     {
      transaction: t
     }
   );
}

export default {
  findByEmail,
}
