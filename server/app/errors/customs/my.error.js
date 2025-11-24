/**
 * @file app/errors/customs/my.error.js
 * @description 커스텀 에러 객체 생성
 * 251124 v1.0.0 sara init 
 */

import { SYSTEM_ERROR } from "../../../configs/responseCode.config.js";

/**
 * 공통 에러 객체 생성
 * @param {string} msg - 에러 메세지 
 * @param {import("../../../configs/responseCode.config.type.js").ResponseCodeConfig } codeInfo - 응답 코드 정보 
 * @returns
 */
export default function myError(msg = '', codeInfo = SYSTEM_ERROR) {
  const err = new Error(msg);
  err.codeInfo = codeInfo;
  // 프로퍼티 이름 자체는 '정적'인데, 에러 객체에 런타임에 새로운 프로퍼티를 추가하는 것이니 '동적으로 프로퍼티 추가'임.
  return err;
}

