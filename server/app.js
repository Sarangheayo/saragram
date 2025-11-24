/** 
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 sara
 */

import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';
import errorHandler from './app/errors/errorHandler.js';

const app = express();
app.use(express.json()); // json 요청 파싱 처리

// --------------
// 라우터 정의
// --------------
app.use('/api/auth', authRouter);





app.use(errorHandler);


// 해당 port로 express 실행
// ENV 스트링으로 가져오니 parseInt 해주기
app.listen(parseInt(process.env.APP_PORT));