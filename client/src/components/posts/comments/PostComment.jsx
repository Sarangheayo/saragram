import './PostComment.css';
import PostCommentCreate from './PostCommentCreate.jsx';
import PostCommentItem from './PostCommentItem.jsx';
export default function PostComment({ id, comments }) {
  
  return (
    <>
      <div className="post-comment-container">
        <p className='post-comment-title'>Comments</p>

        {/* prop으로 postId를 전달하여 어떤 게시물에 대한 댓글인지 식별 */}
        <PostCommentCreate postId={id} />
        <div className="post-comment-item-container">
          {
            // 'comments' 배열의 각 댓글 객체를 PostCommentItem 컴포넌트로 변환
            ((comments && comments.length > 0) && (comments.map(comment => {
              // null인지 아닌지 체크하기 위해서 comments가 있으면 && 으로 한번더 감싸주기
              return (
                <PostCommentItem comment={comment} key={comment.id} />
              )
            })))
          }
        </div>
      </div>
    </>
  )
}