/**
 *  @file app/services/comments.service.js
 *  @description comments Service
 *  251203 v1.0.0 sara init 
 */

import commentRepository from "../repositories/comment.repository.js"

/**
 * 코멘트 작성 처리
 * @param {{ postId: string, replyId: string, content: string }} data 
 */
async function store(data) {
  return await commentRepository.create(null, data);
}

export default {
  store,
}