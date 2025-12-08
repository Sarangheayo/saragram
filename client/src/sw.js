import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';


const PREFIX = import.meta.env.VITE_APP_NAME;

// --------------------------------
// 정적 파일 캐싱
// Vite가 빌드 시 Workbox가 빌드된 정적 리소스 목록을 이 자리에 자동으로 주입
// --------------------------------
precacheAndRoute(self.__WB_MANIFEST);

// --------------------------------
// HTML 오프라인 대응
// ex: USER 새로고침 시, index.html... 서버 요청 X, 캐싱처리해두고 가져오기
// network first로 해도 됨. param1: 검증용 param / param2: true일 때 실행
// --------------------------------
registerRoute(
 ({request}) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: `${PREFIX}-html-cache`,
    networkTimeoutSeconds: 3 // 보통 1초해 둠. 통신 서비스 지역 고려 필요
  }) 
);

// -------------------------------------------
// img caching
// -------------------------------------------
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: `${PREFIX}-image-cache`,
    networkTimeoutSeconds: 3,
  })
);


// --------------------------------------------------
//  API 요청 캐싱(최소 동작 보장)
//
// user의 단순 정보 출력, get 사용, 갱신 잦지않은 정보 등
// delete, put, udt 쪽은 사용 시 주의(get을 제외한 나머지는 제외)  
// api 결과 값을 캐싱 후 화면에 출력 가능
// --------------------------------------------------
registerRoute(
  ({ url, request }) => url.origin === import.meta.env.VITE_SERVER_URL && request.method === 'GET',
  new StaleWhileRevalidate({
    cacheName: `${PREFIX}-api-cache`,
    networkTimeoutSeconds: 3,
  })
); 

