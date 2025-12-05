/**
 * @file app/utils/cookie/cookie.util.js
 * @description Cookie 유틸리티 
 * 251125 v1.0.0 sara init
 */

import dayjs from "dayjs"
import { response } from "express";

// ------------------
// ----- private ----
// ------------------
/**
 * @param {import("express").Response} res 
 * @param {string} cookieName 
 * @param {string} cookieValue 
 * @param {number} ttl 
 * @param {boolean} httpOnlyFlg 
 * @param {boolean} secureFlg 
 * @param {string|null} path
 */
function setCookie(res, cookieName, cookieValue, ttl, httpOnlyFlg = true, secureFlg = false, path = null) {
  const options = {
      expires: dayjs().add(ttl, 'second').toDate(),
      httpOnly: httpOnlyFlg,
      secure: secureFlg,
      sameSite: 'none'
  }

  if(path) {
    options.path = path;
  }

  // setCookieRefreshToken가 통과 시 이 함수가 호출됨 -> 자동 통과  
  res.cookie(
    cookieName,
    cookieValue,
    options);
}

/**
 * 특정 쿠키 획득(미존재 시, 빈문자열 반환)
 * @param {import("express").Request} req 
 * @param {string} cookieName 
 * @return {string} cookieValue
 */
function getCookie(req, cookieName) {
  let cookieValue = '';
  // const가 아닌 이유: 미존재 시 빈문자열 할당 위해

  if (req.cookies) {
    // cookie가 존재하지 않을 수도 있으니 체크
    cookieValue = req.cookies[cookieName];
    // 미존재 시, undefined 방지 = 빈문자열 할당 -> 빈문자열 그대로 반환
  }
  return cookieValue;
}

/**
 * @param {import("express").Response} res 
 * @param {string} cookieName 
 * @param {boolean} httpOnlyFlg 
 * @param {boolean} secureFlg 
 * @param {string|null} path
 */
function clearCookie(res, cookieName, httpOnlyFlg = true, secureFlg = false, path = null) {
  const options = {
    httpOnly: httpOnlyFlg,
    secure: secureFlg,
    sameSite: 'none',
  }

  if(path) {
    options.path = path;
  }  

  res.clearCookie(cookieName, options);
}



// ------------------
// ----- pubilc -----
// ------------------

/**
 * 쿠키에 리프래시 토큰 설정
 * @param {import("express").Response} res 
 * @param {string} refreshToken 
 */
function setCookieRefreshToken(res, refreshToken) {
  // 쿠키에 리프래시 토큰 설정
  setCookie(
    res,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    parseInt(process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRY),
    true,
    true,
    process.env.JWT_REISS_URI
  );
}

/**
 * 쿠키에서 리프래시 토큰 획득
 * @param {import("express").Request} req
 * @return {string} refreshToken
 */
function getCookieRefreshToken(req) {
  return getCookie(req, process.env.JWT_REFRESH_TOKEN_COOKIE_NAME);
  
}

/**
 *  리프레시 토큰 쿠키 제거
 */
function clearCookieRefreshToken(res) {
  clearCookie(
    res,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    true,
    true,
    process.env.JWT_REISS_URI
  );
}

// ------------------
// export
// ------------------
export default {
  setCookieRefreshToken,
  getCookieRefreshToken,
  clearCookieRefreshToken
}