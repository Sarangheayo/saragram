import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 개발 서버 proxy 정의
  server: {
    proxy: {
      // '/api'로 시작하는 요청은 'http://localhost:3000'로 Proxy 설정
      '/api': {
        target: 'http://localhost:3000', // Request 보낼 서버 주소
        changeOrigin: true, // Request 헤더의 Host필드 값을 타겟 URL(대상 서버 호스트)로 변경
        secure: false, // https 적용 여부 SSL 인증서가 유효하지 않은 경우에도 요청을 보낼지 여부 
        webSocket: true, // Websocket 프로토콜 사용 여부(실시간 통신을 위해 필요 시 true로 설정)
        // 채팅같이 실시간 통신이 필요한 기능이 없다면 false로 설정
      }
    }
  }
})

 