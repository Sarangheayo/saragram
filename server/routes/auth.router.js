/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터 
 * 251119 v1.0.0 sara init
 */ 

import express from 'express';
import { authController } from '../app/controllers/auth.controller.js';
import loginValidator from '../app/middlewares/validations/validators/auth/login.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';

const authRouter = express.Router(); 

// 인증 정보 생성이니 post
authRouter.post('/login', loginValidator, validationHandler, authController.login);
// 처리종료 됨. return까지 완벽히 종료 가능 

export default authRouter;