/**
 * @file configs/webpush.config.js
 * @description web push할 때 필요한 설정 파일 
 * 251208 v1.0.0 sara init
 */

import webpush from 'web-push';

webpush.setVapidDetails(
  `mailto:${process.env.JWT_ISSUER}`, //발행자 
  process.env.VAPID_PUBLIC_KEY, // 공용키
  process.env.VAPID_PRIVATE_KEY // 비밀키
);

export default webpush;