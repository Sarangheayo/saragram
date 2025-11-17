# saragram
welcome to saragram!


백엔드 서버:  Express 기반의 모듈형 구조

📁 디렉토리 구조
server/
│
├── app/                      # Express 실행 관련 로직
│   ├── controllers/          # 컨트롤러 레이어
│   ├── middlewares/          # JWT 인증, 권한 체크, 에러 핸들링, 로깅 등
│   ├── models/               # DB 모델 (Sequelize 포함)
│   ├── repositories/         # DB 접근 레이어
│   ├── services/             # 비즈니스 로직 레이어
│   ├── utils/                # 유틸 함수 모음
│   │
│   └── configs/              # 전역 설정 (DB, JWT, OAuth, Push 등)
│
├── databases/                # DB 관련 파일
│   ├── migrations/           # 마이그레이션 스키마
│   └── seeders/              # 초기 더미 데이터
│
├── routes/                   # API 엔드포인트 정의
├── storage/                  # 정적 파일 저장소 (업로드 파일, PWA build 파일 등)
│                             # ※ 운영환경에서는 경로가 다를 수 있음
│
├── app.js                    # API 엔트리 포인트
├── .env                      # 환경 변수 설정 파일
│
└── README.md

🧩 설명 요약
📌 app/

Express 서버의 핵심 로직이 모여 있는 디렉토리

controllers: 요청/응답 처리

middlewares: 인증(JWT), Role 체크, 에러 처리

models: Sequelize 모델

repositories: 모델과 DB 접근 캡슐화

services: 실제 비즈니스 로직

routes: 모든 API endpoint 정의

utils: 공통 모듈

configs: DB, JWT, OAuth, Push 설정 파일/ js code를 통한 설정파일 ( 가공, 수정, 변경 )
         - 미들웨어로 뺄 수도 있음.   
📌 databases/

마이그레이션 및 시드 관리

migrations: 스키마 정의

seeders: 초기 데이터 삽입 (DB 더미 데이터 생성 파일 등 최소 30000건 넣고 테스트 할 때 사용_sequelize CLI)

📌 storage/

업로드된 파일, 빌드 파일 등을 저장하는 로컬 디렉토리
운영 환경에서는 별도 S3/Cloud Storage로 분리될 수 있음.

📌 app.js

백엔드 API의 메인 엔트리 포인트
서버 실행, 미들웨어 등록, 라우터 바인딩 등을 수행.

📌 .env

환경 변수 파일
(DB 주소, JWT secret, OAuth 키 등)