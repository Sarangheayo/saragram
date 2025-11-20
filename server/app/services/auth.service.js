/**
 *  @file app/services/auth.service.js
 *  @description auth Service
 *  251120 v1.0.0 sara init 
 */

import bcrypt from 'bcrypt'; // binary = 컴터가 인식하는 가장 작은 단위 / encrypt = 암호화
import userRepository from "../repositories/user.repository.js";

/**
 * 
 * @param {*} body 
 */
async function login(body) {
  const { email, password } = body;

  // 구조분해해서 email만 가져와서 유저 정보 획득
  // 무조건 promise 객체로 반환 - pending, reject... -> 
  // await 안 해주면 pending 상태 안 거치고 바로 반환 됨 즉 result에 값이 있으니 result 반환 
  const result = await userRepository.findByEmail(null, email);

  // 유저 존재 여부 체크
  if(!result) {
    throw new Error('유저 없음'); 
  } 

  // 비밀번호 체크 
  // 유저에게 받은 평문을 암호화할 때 로직을 만들어주기 -> 
  // bcrypt : 얘가 만들어 줌. 같은지 검사해주는 method가 이미 존재함   
  if(!bcrypt.compareSync(password, result.password)) {
    throw new Error('비밀번호 틀림'); // 실제 로직에서는 '아디 또는 비번이 틀렸습니다'라고 줘야함 / 해커가 가입여부 모르게
  }

  return result;
}
 
export default {
  login,
}