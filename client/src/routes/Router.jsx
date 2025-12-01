import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from "../components/auth/Login.jsx";
import PostIndex from "../components/posts/PostIndex.jsx";
import Registration from "../components/users/Registration.jsx";
import UserInfo from "../components/users/UserInfo.jsx";
import PostShow from "../components/posts/PostShow.jsx";
import PostCreate from "../components/posts/PostCreate.jsx";

const router = createBrowserRouter([
  {
    element: <App />, 
    children: [
      {
        path: '/',
        loader: async () => {
          // 'loader'에 정의한 처리는 라우트 진입 시 실행 됨
          // 'redirect'를 이용해서 해당 라우터로 이동
          return redirect('/posts');
        }
      },
      { // 로그인 페이지
        path: '/login',
        element: <Login />
      },
      // delete는 모달이므로 라우터에 넣지말고 컴포넌트 내부에서 처리
      { // 회원가입 페이지
        path: '/registration',
        element: <Registration />
      },
      { // 사용자 정보 페이지
        path: '/users/:id',
        element: <UserInfo />
      },
      { // 게시글 목록 페이지
        path: '/posts',
        element: <PostIndex />
      },
      { // 특정 포스트 상세 페이지
        path: '/posts/show/:id',
        element: <PostShow />
      },
      { // 새로운 포스트 작성 페이지
        path: '/posts/create',
        element: <PostCreate />
      },
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />
}
