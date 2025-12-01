import { useDispatch, useSelector } from 'react-redux';
import './PostIndex.css';
import { useEffect } from 'react';
import { postIndexThunk } from '../../store/thunks/postIndexThunk.js';

export default function PostIndex() {
  const dispatch = useDispatch();
  const { list, page } = useSelector(state => state.postIndex);
  // backend에서 받아온 post 목록을 보여주는 컴포넌트 : lifecycle method에서 postIndexThunk 실행 필요
  useEffect(() => {
     dispatch(postIndexThunk(page + 1));
    // 여기서 postIndexThunk 실행
  }, []);
  // 초기 페이지는 0이므로, 첫 로드 시 1페이지 요청, 이후 페이지는 기존 페이지 + 1
  // list가 null이면 아직 데이터가 없는 상태이므로, map 함수 실행 시 오류 발생할 수 있음
  // 따라서 list가 존재할 때만 map 함수 실행하도록 처리 필요

  return (
    <>
      <div className="post-index-container">
        <div className="post-index-card-box">
          {
            list && list.map(item => {
              return <div className="post-index-card" style={{backgroundImage: `url(${item.image})`}} key={item.id}></div>
            })
          }  
        </div>
        <button type="button" className='btn-full-width bg-gray'>Show more posts from Kanna_Kamui</button>
      </div>
    </>
  )
}