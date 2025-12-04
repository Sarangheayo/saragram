import './Login.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../../store/thunks/authThunk.js';

export default function Login() {
  const dispatch = useDispatch(); // redux dispatch 함수 가져오기
  const navigate = useNavigate(); // 페이지 이동 함수 가져오기
  const [email, setEmail] = useState('');
  // const [emailErr, setEmailErr] = useState(null);
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    // 기존 이벤트 막기
    e.preventDefault();
 
    try {
      // 로그인 요청 = 로그인 thunk를 dispatch하여 비동기 로그인 처리 
      // promise 반환 = 결과 반환
      await dispatch(loginThunk({ email, password })).unwrap();
      // 로그인 성공 시 메인 페이지로 이동
      return navigate('/posts', {replace: true} ); // 입력 폼이 있는 페이지라면 history.back() 사용 고려
    } catch (error) {
      const code = error.response?.data?.code;
      alert(`로그인에 실패했습니다. ${code}`);
    }
  }

  // email 유효성 검사 정규식 
  // function validationAndSetEmail(e) {
  //   const val = e.target.value;
    
  //   if (/^[0-9]+$/.test(val)) {
  //     setEmail(e.target.value);
  //     setEmailErr( null );
  //   } else {
  //     setEmailErr('이메일 형식이 올바르지 않습니다.');
  //   }
  // }

  function handleSocial(provider) {
    window.location.replace(`/api/auth/social/${provider}`); // redirect 처리
  }

  return (
    <>
      <form className="login-container" onSubmit={handleLogin}>
        {/* {emailErr && <div className="error-message">{emailErr}</div>} */}
        {/* <input type="text" className={`input-big-border ${emailErr ? 'red-border' : 'green-border'}`}  onChange={e => { setEmail(e.target.value) }} placeholder='email' /> */}
        <input type="text" className={`input-big-border`}  onChange={e => { setEmail(e.target.value) }} placeholder='email' />
        <input type="password" className='input-big-border' onChange={e => { setPassword(e.target.value) }} placeholder='password' />
        <button type="submit" className="btn-big bg-gray">Log in</button>
        <div className="text-on-line">or</div>
        <button type="button" className="btn-big bg-img-kakao" onClick={() => {handleSocial('kakao')}} ></button>
        <button type="button" className="btn-big bg-light">Sign up</button>
      </form>
    </>
  )
}
