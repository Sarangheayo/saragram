/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description 유저 정보 유효성 검사 필드
 * 251119 v1.0.0 sara init 
 */
import { body } from "express-validator";

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

const email = body('email').trim()
.notEmpty().withMessage('이메일은 필수 항목입니다.')
.bail()
.isEmail().withMessage('유효한 이메일을 입력해주세요.')
// express에서 주는 걸로 간단하게 체크할라면 할 수 있음 = isEmail
;

const password = body('password')
.trim()
.notEmpty()
.withMessage('비밀번호는 필수 항목입니다.')
.bail()
.matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
.withMessage('영어대소문자·숫자·!·@·#·$ 8~20자 허용')
// pw체크는 이걸로 정규식해주는게 가장 간단합니당
;

export default {
  email,
  password,
};
