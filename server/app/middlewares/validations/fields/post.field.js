/**
 * @file app/middlewares/validations/fields/post.field.js
 * @description 게시글 유효성 검사 필드
 * 251128 v1.0.0 sara init 
 */

import { body, param, query } from "express-validator";
import fs from 'fs';
import pathUtil from "../../../utils/path/path.util.js";
import path from "path";

// 페이지 필드
export const page = query('page')
  // 요청 쿼리스트링에서 page 값 가져오기 예 : /api/posts?page=1
  .trim()
  .optional()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

  // 게시글 PK 필드
export const id = param('id')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 게시글 내용
export const content = body('content')
  .trim()
  .notEmpty()
  .withMessage('내용은 필수 항목입니다.');

// 게시글 이미지
export const image = body('image')
  .trim()
  .notEmpty()
  .withMessage('이미지는 필수 항목입니다.')
  .bail()
  .custom(val => {
    // 우리 앱의 게시글 이미지에 접근하는 `도메인 + path` = 이미지 경로가 올바른지 검사
    if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}`)) {
      return false;
    }

    return true;
  })
  .withMessage('허용하지 않는 이미지 경로입니다.')
  .bail()
  .custom(val => {
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getPostsImagePath(), splitPath[splitPath.length - 1]);
    // 이미지 파일이 실제로 존재하는지 검사 /sarah/workspace/saragram/server/storage/images/posts
    console.log(fullPath);
    if(!fs.existsSync(fullPath)) {
      return false;
    }

    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.');  
