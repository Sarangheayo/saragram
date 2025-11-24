/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 sara init
 */

import { createBaseResponse } from "../utils/createBaseResponse.util.js";
import { SUCCESS } from "../../configs/responseCode.config.js";
import authService from "../services/auth.service.js";

// ------------------
// ----- pubilc -----
// ------------------
/**
 * 로그인 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 레스폰스 객체
 * @param {import("express").NextFunction} next = 넥스트 객체
 * @returns
 */

// login 대신 signIn도 ㄱㅊ 함수 이름은 아무거나 괜찮
async function login(req, res, next) {
  try {
    const body = req.body; // 파라미터 획득
    
    // 로그인 서비스 호출
    const result = await authService.login(body);
  
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    // return res.status(500).send(error.message);
    next(error);
  }
}

// ------------------
// export
// ------------------
export const authController = {
  login,
};
