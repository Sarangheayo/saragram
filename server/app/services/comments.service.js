/**
 *  @file app/services/comments.service.js
 *  @description comments Service
 *  251203 v1.0.0 sara init 
 */

import commentRepository from "../repositories/comment.repository.js";
import db from '../models/index.js';
import postRepository from '../repositories/post.repository.js';
import userRepository from '../repositories/user.repository.js';
import pushSubscriptionRepository from "../repositories/pushSubscription.repository.js";
import webpush from '../../configs/webpush.config.js';

/**
 * 코멘트 작성 처리
 * @param {{ postId: string, userId: string, content: string }} data 
 */
async function store(data) {
  // 코멘트 작성
  const comment = await commentRepository.create(null, data);
  
  // 게시글 조회
  const post = await postRepository.findByPk(null, data.postId);

  // 타인의 게시글일 경우만 푸시 보내기   
  if(post.userId !== data.userId) {
   await db.sequelize.transaction(async t => {
      const user = await userRepository.findByPk(t, data.userId);
      // 푸시 데이터 작성 
      const payload = JSON.stringify({
        title: '새로운 댓글', // 푸시 제목
        message: `${user.nick}님께서 당신의 게시글에 댓글을 작성하셨습니다.`, // 푸시 내용
        data: { // 푸시 화면에서 출력하지 않지만 전달할 필요가 있는 data 
          targetUrl: `${process.env.APP_URL}${process.env.WEB_PUSH_FRONT_URL_POST_SHOW}/${data.postId}`  
        } 
      });

      // 게시글 작성자의 푸시 정보 획득
      const pushSubscriptions = await pushSubscriptionRepository.findByUserId(t, post.userId)

      // 해당 푸시 발송

      //(  // subscription의 구조 만들어 줘야 함
      // {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/dFlTq11Ly-w:...',
      //   expirationTime: null,
      //   keys: {
      //     p256dh: 'BD9B5KMdQbwgG7...',
      //     auth: 'OL56CZS...'
      //   }
      // }
      // deviceInfo의 구조
      // {
      //   userAgent: navigator.userAgent,   // 브라우저/디바이스 정보
      //   language: navigator.language      // 언어 정보
      // })
      const pushList = pushSubscriptions.map(async pushSubscription => {
        // subscription 구조
        const subscription = {
          endpoint: pushSubscription.endpoint,
          expirationTime: null,
          keys: {
            p256dh: pushSubscription.p256dh,
            auth: pushSubscription.auth
          }
        };

        try {
          await webpush.sendNotification(subscription, payload);
        } catch(error) {
          // expired 푸시는 제거
          if(error.statusCode === 410 ) {
            await pushSubscriptionRepository.hardDestroy(t, pushSubscription.id);
          }
            // console.log(error);
        }
      });

      // 병렬처리 완료 확인
      await Promise.allSettled(pushList);
      //  console.log('push error', pushSubscriptions) 
    });
  }

  return comment;
}

export default {
  store,
}