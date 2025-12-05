/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description 유저 정보 유효성 검사 필드
 * 251205 v1.0.0 sara init 
 */

import { body, param } from "express-validator";
import PROVIDER from "../../auth/configs/provider.enum.js";
import pathUtil from "../../../utils/path/path.util.js";
import path from 'path';
import fs from 'fs';


// export const email = body('email')
// .notEmpty()
// .withMessage('이메일은 필수 항목입니다.')
// .bail()
// .isEmail()
// // 간단하게 체크할라면 할수 있음 = isEmail
// .withMessage('유효한 이메일을 입력해주세요.')
// ;

// export const password = body('password')
// .notEmpty()
// .withMessage('비밀번호는 필수 항목입니다.')
// .bail()
// .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
// .withMessage('영어대소문자·숫자·!·@·#·$ 8~20자 허용')
// // pw체크는 이걸로 정규식해주는게 가장 간단합니당
// ;

const email = body('email')
  .trim()
  .notEmpty()
  .withMessage('이메일은 필수 항목입니다.')
  .bail()
  .isEmail()
  .withMessage('유효한 이메일을 입력해주세요.')
// express에서 주는 걸로 간단하게 체크할라면 할 수 있음 = isEmail
;

const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
  .withMessage('영어대소문자·숫자·!·@·#·$ 8~20자 허용')
  .withMessage('허용하지 않는 값입니다.')
  // pw체크는 이걸로 정규식해주는게 가장 간단합니당
;

const provider = param('provider')
  .trim()
  .notEmpty()
  .withMessage('필수항목입니다.')
  .bail()
  .custom(val => {
    return PROVIDER[val.toUpperCase()] ? true : false;
  })
  .withMessage('허용하지 않는 값입니다.')


// 비밀번호 체크 
const passwordChk = body('passwordChk')
  .trim()
  .notEmpty()
  .withMessage('필수항목입니다.')
  .bail()
  .custom((val, {req}) => {
    if(val !==  req.body.password) {
      return false;
    }
    return true;
  })
  .withMessage('비밀번호와 비밀번호 체크가 다릅니다.')
;

// 닉네임  
const nick = body('nick')
  .trim()
  .notEmpty()
  .withMessage('필수항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9가-힣_]{3,20}$/)
  .withMessage("닉네임은 '영어대소문자·숫자·한글·_ 3~20자만 허용합니다.")

// 프로필 이미지
const profile =  body('profile')
  .trim()
  .notEmpty()
  .withMessage('이미지는 필수 항목입니다.')
  .bail()
  .custom(val => {
    // 우리 앱의 게시글 이미지에 접근하는 `도메인 + path` = 이미지 경로가 올바른지 검사
    if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_USER_PROFILE_PATH}`)) {
      return false;
    }
    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.')
  .bail()
  .custom(val => {
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getProfilesImagePath(), splitPath[splitPath.length - 1]);
    // 이미지 파일이 실제로 존재하는지 검사 /sarah/workspace/saragram/server/storage/images/posts
  
    if(!fs.existsSync(fullPath)) {
      return false;
    }

    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.');  

export default {
  email,
  password,
  provider,
  passwordChk,
  nick,
  profile,
};


