## REACT SHOPPING APP
* 로그인부터 상품 조회, 등록, 수정, 장바구니 등록 및 삭제, 결제 등 쇼핑몰 사이트의 전반적인 과정을 다루고 있습니다.  
* client에서는 react를 사용하고 있으며 server는 nodejs express, DB는 mongoDB를 사용하여 데이터를 관리합니다.   
* HEROKU를 사용하여 배포되었습니다.

## 주소
* <https://protected-reef-94609.herokuapp.com/>

## 페이지 구성
|                       메인 페이지                     |                    로그인 & 회원가입 모달            |
| :--------------------------------------------: | :---------------------------------------------: |
| <img src = "https://user-images.githubusercontent.com/86645532/197843010-312a5a44-8072-4652-a3e9-85037389f5db.png" width="400px"> | <img src = "https://user-images.githubusercontent.com/86645532/197843531-423b6130-1961-46bb-8b3b-549fbfc385fb.png" width="200px"> <img src = "https://user-images.githubusercontent.com/86645532/197843789-c33d305e-fd27-4148-a7cf-8362c3e392c8.png" width="200px"> |



|                     상품 상세 페이지                      |               동록 & 수정 페이지                     |
| :----------------------------------------------------: | :---------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/86645532/197844033-4c34c037-8603-4f4a-85d9-9a97a65fd5ca.png" width="400px"> | <img src="https://user-images.githubusercontent.com/86645532/197844290-9d65158e-3e25-4524-93b1-7705013c689c.png" width="400px"> |



|                      장바구니 페이지                       |                     결제 페이지                      |
| :---------------------------------------------: | :---------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/86645532/197844584-a4ecda39-37ef-49b9-9c44-b998799b8f36.png" width="400px"> | <img src="https://user-images.githubusercontent.com/86645532/197844801-040a4979-130a-4939-ad88-615a9304175d.png" width="400px"> |

|                      결제 완료 페이지                       |                     구매 내역 페이지                      |
| :---------------------------------------------: | :---------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/86645532/197845182-230f052c-0292-470a-a81c-06f6d53a0919.png" width="400px"> | <img src="https://user-images.githubusercontent.com/86645532/197845324-bafbcd63-b5b8-4fce-9046-a3ae2498cc7b.png" width="400px"> |

|                      등록 상품 관리 페이지                       |                     다크 모드                      |
| :---------------------------------------------: | :---------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/86645532/197845596-964082eb-d94d-41b8-b203-68cb8d3ff31d.png" width="400px"> | <img src="https://user-images.githubusercontent.com/86645532/197845812-8f1f0287-a001-47d9-98ea-eff888561a82.png" width="400px"> |





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
