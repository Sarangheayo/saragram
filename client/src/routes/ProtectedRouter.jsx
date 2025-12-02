import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { reissueThunk } from "../store/thunks/authThunk.js";
import { clearAuth } from "../store/slices/authSlice.js";

const ROLE = {
  ADMIN: 'ADMIN',
  SUPER: 'SUPER',
  NORMAL: 'NORMAL',
};
const { ADMIN, NORMAL, SUPER } = ROLE;

const AUTH_REQUIRED_ROUTES = [
  { path: /^\/users\/[0-9]+$/, roles: [ NORMAL, SUPER ]},
  { path: /^\/posts\/show\/[0-9]+$/, roles: [ NORMAL, SUPER ]},
  { path: /^\/posts\/create$/, roles: [ NORMAL, SUPER ]},
];

const GUEST_ONLY_ROUTES = [
  /^\/login$/, 
  /^\/registration$/,
];

export default function ProtectedRouter() {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      if (!isLoggedIn) {
        try {
          await dispatch(reissueThunk()).unwrap();
        } catch (error) {
          console.log('protectedRouter 재발급', error);
          dispatch(clearAuth());
        }
      }
      setIsAuthChecked(true);
    }
    checkAuth();
  }, [dispatch, isLoggedIn]); // (선택) 의존성 추가 가능

  if (!isAuthChecked) {
    return <></>;
  }

  const isGuestRoute = GUEST_ONLY_ROUTES.some((regex) => regex.test(location.pathname));

  if (isGuestRoute) {
    if (isLoggedIn) {
      return <Navigate to="/posts" replace />;
    } 
  } else {
    const matchRole = AUTH_REQUIRED_ROUTES.find(item => item.path.test(location.pathname));

    if (matchRole) {
       if (isLoggedIn) {
        if (matchRole.roles.includes(user.role)) {
          return <Outlet/>;
        } else {
          alert('권한이 부족하여 사용할 수 없습니다.');
          return <Navigate to="/posts" replace />;
        }
       } else {
        alert('로그인이 필요한 서비스입니다');
        return <Navigate to="/login" replace />;
       }
     }
  }
  return <Outlet/>;
}
