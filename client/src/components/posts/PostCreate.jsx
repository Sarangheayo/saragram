import { useState } from 'react';
import './PostCreate.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postImageUploadThunk, postStoreThunk } from '../../store/thunks/postCreateThunk.js'; 

export default function PostCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(''); 


  async function handleCreate(e) {
    e.preventDefault();
    try {
      const resultUpload = await dispatch(postImageUploadThunk(file)).unwrap();
      const image = resultUpload.data.path; // 파일 업로드 URL 획득
      // image = resultUpload.data.path; 이미지의 url을 가지고 옴

      // 게시글 작성 
      const resultStore = await dispatch(postStoreThunk( { content, image } )).unwrap();

      // 작성한 게시글 상세로 이동
      return navigate(`/posts/show/${resultStore.data.id}`, { replace: true });
      // replace: true → history.replace() 느낌 // 로그인 성공 후 뒤로가기 눌러도 로그인 페이지로 안 돌아감
      
    } catch(error) {
      console.log('게시글 생성', error);
      return alert('게시글 생성 실패');
      // 예쁜 모달로도 에러 알림 설정 -> 출력 가능 
    }
  
  }

  // 파일 변경 시 처리 함수
function changeFiles(e) {
  // 선택 파일 정보 획득(1개의 파일만 올리는 걸 전제)
  const file = e.target.files[0];

  // 미리보기
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file); 
  fileReader.addEventListener('load', () => { setPreview(fileReader.result) });
  setFile(file); // 유저가 준 파일 세팅 
}

  return (
    <>
      <form className="post-create-container" onSubmit={handleCreate}>
        <textarea className='post-create-textarea' onChange={e => { setContent(e.target.value) }} placeholder='내용 작성'></textarea>
        <input type="file" onChange={changeFiles} accept="image/*" />
        {
          preview && (
            <div className="post-create-image" style={{backgroundImage: `url("${preview}")`}}></div>
          )
        }
        <button type="submit" className="btn-big bg-gray">Write</button>
      </form>
    </>
  )
}