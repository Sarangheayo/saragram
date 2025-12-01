/**
 * @file app/controllers/posts.controller.js
 * @description 게시글 관련 컨트롤러
 * 251128 v1.0.0 sara init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import postsService from "../services/posts.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// ------------------
// ----- pubilc -----
// ------------------
/**
 * 게시글 리스트 조회 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next = NextFunction 객체
 * @returns
 */
async function index(req, res, next) {
  try {
    const page = req.body?.page || 1;
    
    const result = await postsService.pagination(page);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 게시글 상세 조회 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next = NextFunction 객체
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await postsService.show(req.params.id);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  }catch(error) {
    return next(error);
  }
}

/**
 * 게시글 작성
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns 
 */
async function store(req, res, next) {
  try {
    const data = {
      userId: req.user.id, // auth.middleware.js에서 req.user 셋팅됨
      content: req.body.content,
      image: req.body.image,
    };

    // api를 만든다면 req.user의 pk값을 이용해 작성자 정보를 가져오는 것이 가능함

    const result = await postsService.create(data);
    // service에서 반환된 생성된 게시글 정보를 result에 할당 

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
    // db에서 반환된 생성된 게시글 정보를 클라이언트에 응답
  } catch(error) {
    return next(error);
  }
}

/**
 * 게시글 삭제
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function destroy(req, res, next) {
  try {
    const data = {
      userId: req.user.id, // auth.middleware.js에서 req.user 셋팅됨
      postId: req.params.id // 삭제할 게시글 id 
      // 위둘이 조합되어야만 삭제 가능 (본인 글만 삭제 가능하도록)
    };

    await postsService.destroy(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS));
    // 담는 데이터는 없으므로 SUCCESS 코드만 응답
    // 삭제가 완료되었음을 클라이언트에 응답
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
  store,
  destroy,
}

