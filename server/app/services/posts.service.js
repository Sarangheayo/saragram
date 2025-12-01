/**
 *  @file app/services/posts.service.js
 *  @description posts Service
 *  251128 v1.0.0 sara init 
 */

import myError from '../errors/customs/my.error.js';
import postRepository from "../repositories/post.repository.js";
import db from '../models/index.js';
import commentRepository from "../repositories/comment.repository.js";
import likeRepository from "../repositories/like.repository.js";
import { UNMATCHING_USER_ERROR } from '../../configs/responseCode.config.js';

// -----------------------
// Public
// -----------------------
/**
 * 게시글 페이지네이션(최상위 댓글 포함)
 * @param {import("./posts.service.type.js").page} page - 페이지 번호
 * @returns {Promise<Array<import("../models/Post.js").Post>}
 */
async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);
  
  return await postRepository.pagination(null, { limit, offset });
}

/**
 * 게시글 상세
 * @param {import("./posts.service.type.js").Id} id 
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function show(id) {
  return await postRepository.findByPkWithComments(null, id);
}

/**
 * 게시글 작성
 * @param {import("./posts.service.type.js").PostStoreData} data
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function create(data) {
  return db.sequelize.transaction(async t => {
  return await postRepository.create(t, data);
  });
}
// 처리가 하나 밖에 없으므로 트랜잭션 처리하지 않음. store에서 여러 처리가 일어날 경우 트랜잭션 처리 필요
// transaction으로 묶으면 성능 저하 우려, 두 번의 불필요한 요청 발생


/**
 * 게시글 삭제
 * @param {import("./posts.service.type.js").PostDestroyData} data 
 * @returns {Promise<number>}
 */
async function destroy({ userId, postId }) {
  // userId, postId 둘을 구조 분해하여 사용

  // 트랜잭션 시작
  return await db.sequelize.transaction(async t => {
    // (게시글 작성자 일치 확인용) / transaction 객체 전달해서 하나라도 중간에 실패 시 롤백 처리
    const post = await postRepository.findByPk(t, postId);

    // 게시글 작성자 일치 확인
    if(post.userId !== userId) {
      // 현재 접속한 userId와 게시글 작성자 userId가 다를 경우 에러 발생
      throw myError('작성자 불일치', UNMATCHING_USER_ERROR);
    }

    // 코멘트 삭제
    await commentRepository.destroy(t, postId);
    // foreign key 제약 조건 때문에 댓글부터 삭제 후 좋아요 삭제

    // 좋아요 삭제
    await likeRepository.destroy(t, postId);
    // foreign key 제약 조건 때문에 댓글부터 삭제 후 게시글 삭제
    
    // 게시글 삭제
    await postRepository.destroy(t, postId);
    // foreign key 제약 조건 때문에 댓글, 좋아요부터 삭제 후 게시글 삭제
  });
  
}
// 전부 성공 시 커밋, 하나라도 실패 시 롤백 처리


// -----------------------
// Export
// -----------------------

export default {
  pagination,
  show,
  create,
  destroy,
}