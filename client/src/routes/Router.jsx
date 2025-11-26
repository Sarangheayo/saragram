import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from "../components/auth/Login.jsx";
import PostIndex from "../components/posts/PostIndex.jsx";

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
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/posts',
        element: <PostIndex />
      }
      // delete는 모달이므로 라우터에 넣지말고 나머지 라우터에 넣어서 해당 주소를 
      // 넣으면 뜨게 해줘! 
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />
}
