/**
 *  @file app/services/auth.service.js
 *  @description auth Service
 *  251120 v1.0.0 sara init 
 */

import bcrypt from 'bcrypt'; // binary = 컴터가 인식하는 가장 작은 단위 / encrypt = 암호화
import userRepository from "../repositories/user.repository.js";
import { NOT_REGISTERED_ERROR } from '../../configs/responseCode.config.js';
import myError from "../errors/customs/my.error.js"
import jwtUtil from '../utils/jwt/jwt.util.js';
// import { logger } from "../middlewares/loggers/winston.logger.js"
import db from "../models/index.js"

/**
 * login
 * @param {{emali: string, password: string}}} body 
 * @returns {Promise<import("../models/User.js").User>}
 */
async function login(body) {
  // 트렌젝션 처리 
  return await db.sequelize.transaction(async t => {
    // 비즈니스 로직 작성...
    const { email, password } = body;
  
    // 구조분해해서 email만 가져와서 유저 정보 획득
    // 무조건 promise 객체로 반환 - pending, reject... -> 
    // await 안 해주면 pending 상태 안 거치고 바로 반환 됨 즉 user에 값이 있으니 user 반환 
    
    // 이메일로 유저 정보 획득 
    const user = await userRepository.findByEmail(t, email);
  
    // 유저 존재 여부 체크
    if(!user) {
      throw myError('유저 미존재', NOT_REGISTERED_ERROR ); 
    } 
  
    // 비밀번호 체크 
    // 유저에게 받은 평문을 암호화할 때 로직을 만들어주기 -> 
    // bcrypt : 얘가 만들어 줌. 같은지 검사해주는 method가 이미 존재함   
    if(!bcrypt.compareSync(password, user.password)) {
      throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR); // 실제 로직에서는 '아디 또는 비번이 틀렸습니다'라고 줘야함 / 해커가 가입여부 모르게
    }
  
    // JWT 생성(accessToken, refreshToken)
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);
  
    // refreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);
  
    return {
      accessToken,
      refreshToken,
      user
   }
  });
}

export default {
  login,
}

