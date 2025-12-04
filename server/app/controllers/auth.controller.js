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
import PROVIDER from "../middlewares/auth/configs/provider.enum.js";
import socialKakaoUtil from "../utils/social/social.kakao.util.js";

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

/**
 * 소셜로그인 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 레스폰스 객체
 * @param {import("express").NextFunction} next = 넥스트 객체
 * @returns
 */

async function social(req, res, next) {
  const provider = req.params.provider.toUpperCase(); 
  try {
    let url = '';

    switch(provider) {
      case PROVIDER.KAKAO:
        url = socialKakaoUtil.getAuthorizeURL();
        break;
    }

    return res.redirect(url);
  } catch(error) {
    next(error);
  }
}

/**
 * 소셜로그인 콜백 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 레스폰스 객체
 * @param {import("express").NextFunction} next = 넥스트 객체
 * @returns
 */
async function socialCallback(req, res, next) {
  try {

    const provider = req.params.provider.toUpperCase();
    let refreshToken = null;
    let code = null;

    switch(provider) {
      case PROVIDER.KAKAO:
        code = req.query?.code;
        refreshToken = await authService.socialKakao(code);
        break;
    }

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);
    
    return res.redirect(process.env.SOCIAL_CLIENT_CALLBACK_URL);
  } catch(error) {
    next(error)
  }
}

// ------------------
// export
// ------------------
export const authController = {
  login,
  reissue,
  social,
  socialCallback
};
