import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './PostIndex.css';
import { useEffect } from 'react';
import { postIndexThunk } from '../../store/thunks/postIndexThunk.js';

export default function PostIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, page, isLasted } = useSelector(state => state.postIndex);
  // backend에서 받아온 post 목록을 보여주는 컴포넌트 : lifecycle method에서 postIndexThunk 실행 필요

  
  useEffect(() => {
    //다른 페이지 다녀와서 돌아올 때도 실행되지 않도록 빈 배열 넣기
    // ex: useEffect(() => { ... }, []);
    if (!list) {
      dispatch(postIndexThunk(page + 1));
    }
  }, []);

  // 초기 페이지는 0이므로, 첫 로드 시 1페이지 요청, 이후 페이지는 기존 페이지 + 1
  // list가 null이면 아직 데이터가 없는 상태이므로, map 함수 실행 시 오류 발생할 수 있음
  // 따라서 list가 존재할 때만 map 함수 실행하도록 처리 필요
  // 초기 로드 시에만 실행되도록 useEffect의 두 번째 인자로 빈 배열([]) 전달

  function nextPage() {
    dispatch(postIndexThunk(page + 1));
  }
  
  function redirectPostShow(id) {
    navigate(`/posts/show/${id}`);
  };

  return (
    <>
      <div className="post-index-container">
        <div className="post-index-card-box">
          {
            list && list.map(item => {
              return (
                <div 
                  className="post-index-card" 
                  style={{backgroundImage: `url(${item.image})`}} 
                  key={item.id}
                  onClick={() => {redirectPostShow(item.id)}}
                ></div>
              ) 
            })
          }  
        </div>
        {/* 더 많은 포스트를 불러오는 버튼 */}
        {
          !isLasted && <button type="button" className='btn-full-width bg-gray' onClick={nextPage} >Show more posts</button> 
        }
      </div>
    </>
  )
}

// 더 불러올 페이지가 없는 경우 버튼 숨기기
// { !isLasted && <button type="button" className='btn-full-width bg-gray'
// onClick={nextPage} >Show more posts</button> }
// /posts/show/:id(클릭한 아이템의 아이디 = key={item.id})