// sw가 해야할 일 정의. 처음 실행 시 sw 등록해놔야 install, active, idle ... 가능
// swRegister : 브라우저에서 제공해주는 애: build 기준, '/', scope: 도메인 전체 커버


const swRegister = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", { scope: '/' })
      .then((registration) => {
        console.log("서비스워커 등록 성공", registration);
      })
      .catch((error) => {
        console.error("서비스워커 등록 실패: ", error);
      });
  }
}

export default swRegister;