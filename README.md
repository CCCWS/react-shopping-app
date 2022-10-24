## 배포 주소
* <https://protected-reef-94609.herokuapp.com/>


로그인부터 상품 조회, 등록, 수정, 장바구니 등록 및 삭제, 결제 등 쇼핑몰의 전반적인 과정을 다루고 있습니다.  
client에서는 react를 사용하고 있으며 server는 nodejs express, DB는 mongoDB를 사용하여 데이터를 관리합니다. 
HEROKU를 사용하여 배포되었습니다.





## 사용된 라이브러리

* client
  * @reduxjs/toolkit - 1.8.6 / 리덕스 사용편의성 증가
  * antd - 4.21.1 / 컴포넌트 및 아이콘
  * axios - 0.26.1 / 서버 통신
  * http-proxy-middleware - 2.0.4 / cors 관련 오류 방지 proxy설정
  * react - 18.1.0 / 사용자 인터페이스
  * react-daum-postcode - 3.1.1 / 카카오 주소 검색
  * react-dom - 18.1.0 / 컴포넌트 랜더링
  * react-dropzone 14.2.1 / 파일 업로드
  * react-intersection-observer - 9.4.0 / 타겟 컴포넌트 관찰
  * react-paypal-express-checkout 1.0.5 / paypal 결제
  * react-redux - 7.2.8 / 리액트 최적화 리덕스
  * react-reveal - 1.2.2 / 컴포넌트 애니매이션
  * react-router-dom - 6.3.0 / single page application 화면 전환
  * react-transition-group - 4.4.5 / 컴포넌트에 transition 적용
  * redux-persist - 6.0.0 / 리덕스 데이터 보존
  * styled-components 5.3.5 / 스타일 컴포넌트
  
  
  
* server
  * bcrypt - 5.0.1 / 문자열 암호화
  * concurrently - 7.1.0 / 서버, 클라이언트 동시 실행
  * cookie-parser - 1.4.6 / 요청된 쿠키 추출
  * express - 4.17.3 / nodejs 서버
  * fs - 0.0.1-security / 파일시스템 접근
  * jsonwebtoken - 8.5.1 / 로그인시 사용될 토큰 생성
  * mongoose - 6.2.9 / mongoDB
  * multer - 1.4.5-lts.1 / 파일 업로드
  * nodemon - 2.0.15 / 서버 변경사항 실시간 
