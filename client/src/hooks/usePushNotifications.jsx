import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";

export default function usePushNotifications() {
  // 권한 플래그
  // NotificationPermission: "default" | "denied" | "granted"
  // 유저가 권한 거부를 한 경우, 코드상으로는 재설정 불가능
  // 크롬의 경우 `chrome://settings/content/notifications`로 접속하여 직접 허용 설정 필요
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [isCheckedSubscribe, setIsCheckedSubscribe] = useState(false);

  useEffect(() => {
    // usePushNotifications 초기화
    async function init() {
      try {
        // 서비스 워커 준비
        const registration = await navigator.serviceWorker.ready;
        
        // 등록 중인 구독 정보 획득
        const subscribing = await registration.pushManager.getSubscription();
        if(subscribing) {
          setIsSubscribing(true);
        }
        // console.log('usePushNotifications init', subscribing);
        
      } catch(error) {
        console.log(error);
      } finally {
        setIsInit(true); // 초기화 끝났으니 init -> true 변경
      }
    }
    init();
  }, []);

  // 권한 요청
  async function requestPermission() {
    try {
      if('Notification' in window) {
        // Notification 지원하는 경우
        if(Notification?.permission === 'default') {
          // 허용이 아닌경우 처리
          const result = await Notification.requestPermission();
          
          if(result !== 'granted') {
            alert('알림 허용을 하지 않으면 서비스 이용에 제한이 있습니다.');
            return false;
          } else {
            return true;
          }
        } else if(Notification?.permission === 'denied') {
            alert('알림을 거부하신 이력이 있습니다.\n알림 허용을 하지 않으면 서비스 이용에 제한이 있습니다.');
            // 안내 문자 하나 추가하면 좋음 "ex: 설정 -> 디바이스 ... 로 들어가서 on하시면 됩니다"
            return false;
        } else {
          return true; // 이미granted 일 때 
        }
      } else {
        // Notification 지원하지 않는 경우
        alert('알림을 지원하지 않는 브라우저입니다.');
        return false;
      }
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  // 구독 등록
  async function subscribeUser() {
    try {
      if(!isSubscribing) {
        const isGranted = await requestPermission();

        // 권한 확인
        if(!isGranted) {
          return; // false 반환 시 그냥 종료 -> finally : flag남기고 종료 //
        }
        // 등록 이력 X, accept 클릭 시 -> 서비스 워커 준비
        const registration = await navigator.serviceWorker.ready;

        // 서비스 워커에 구독 정보 등록
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY // 직접 문서에 : 퍼블릭 키 값 적어두세요
        });
  
        // subscription의 구조
        // {
        //   endpoint: 'https://fcm.googleapis.com/fcm/send/dFlTq11Ly-w:...',
        //   expirationTime: null,
        //   keys: {
        //     p256dh: 'BD9B5KMdQbwgG7...',
        //     auth: 'OL56CZS...'
        //   }
        // }
  
        const deviceInfo = {
          userAgent: navigator.userAgent,   // 브라우저/디바이스 정보
          language: navigator.language      // 언어 정보
        };
        
        // Backend에 구독 정보 등록 요청
        await axiosInstance.post('/api/subscriptions', {subscription, deviceInfo});
        
        alert('구독 성공');
      }
    } catch(error) {
      console.error("구독 실패: ", error);
    } finally {
      setIsCheckedSubscribe(true);
    }
  }

  return {
    isInit,
    isSubscribing,
    isCheckedSubscribe,
    subscribeUser,
  }
}
 
// src/hooks/customHook.jsx 