/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터 
 * 251119 v1.0.0 sara init
 */ 

import express from 'express';
import { authController } from '../app/controllers/auth.controller.js';
import loginValidator from '../app/middlewares/validations/validators/auth/login.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import socialValidator from '../app/middlewares/validations/validators/auth/social.validator.js';

const authRouter = express.Router(); 

// 인증 정보 생성이니 post
authRouter.post('/login', loginValidator, validationHandler, authController.login);
authRouter.post('/reissue', authController.reissue); 
authRouter.get('/social/:provider', socialValidator, validationHandler, authController.social); // :kakao or /:google 
authRouter.get('/callback/:provider', authController.socialCallback); // from kakao -> 문제 크게 없으므로 유효성 검사 패스

// 처리종료 됨. return까지 완벽히 종료 가능 

export default authRouter;