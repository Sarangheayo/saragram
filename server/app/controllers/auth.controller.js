/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 sara init
 */

import { createBaseResponse } from "../utils/createBaseResponse.util.js";
import { REISSUE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import authService from "../services/auth.service.js";
import cookieUtil from "../utils/cookie/cookie.util.js";
import myError from "../errors/customs/my.error.js";

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
    const { accessToken, refreshToken, user } = await authService.login(body);
  
    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);


    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, {accessToken, user}));
  } catch(error) {
    next(error);

  }
}


/**
 * 토큰 재발급 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 레스폰스 객체
 * @param {import("express").NextFunction} next = 넥스트 객체
 * @returns
 */

async function reissue(req, res, next) {
  try {
    const token = cookieUtil.getCookieRefreshToken(req);
    // 토큰 존재 여부 확인
    if(!token) {
      throw myError('리프래시 토큰이 존재하지 않습니다.', REISSUE_ERROR);

    }
    // 토큰 재발급 처리 진행
    const { accessToken, refreshToken, user } = await authService.reissue(token);

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);
    
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, {accessToken, user}));
    
  } catch(error) {
    next(error);
  }
}

// ------------------
// export
// ------------------
export const authController = {
  login,
  reissue,
};
