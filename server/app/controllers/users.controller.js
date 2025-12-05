/**
 * @file app/controllers/users.controller.js
 * @description 유저 관련 컨트롤러
 * 251205 v1.0.0 sara init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import userService from '../services/users.service.js'
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

/**
 * 회원가입 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns 
 */
async function store(req, res, next) {
  try {
    const data = {
       email: req.body.email,
       password: req.body.password,
       nick: req.body.nick,
       profile: req.body.profile,
      //  role: 'NORMAL',
      //  provider: 'NONE' // 서비스에서 넣어도됨
    };


    await userService.store(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

// ------------------
// export
// ------------------
export default {
  store,
};

