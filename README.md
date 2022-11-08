
## REACT SHOPPING APP

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/REDUX-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> 

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/Mongo DB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> 

<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white"> 







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


## 특징
  * Dark Mode  

|                   OFF                 |                    ON                      |
| :---------------------------------------------: | :---------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/86645532/200363660-bc95ce07-afe4-4c9b-b8d7-518c35dd380d.png" > | <img src="https://user-images.githubusercontent.com/86645532/200363764-c2f3309b-497f-4d8d-9d43-248f4b8bac41.png" > |

     Redux-store에서 다크모드 on/off를 전역적으로 관리하여 모든 컴포넌트에서 적용됩니다.


  * Modal  
<img src="https://user-images.githubusercontent.com/86645532/200364170-e3601112-0308-42bf-86fa-cb3225bdc5ef.png" width="200px">


     페이지 이동없이 로그인이 가능하며 경고나 알람이 필요할때 alert 사용을 최소화하여 사용 편의성을 증가시켰습니다.
     
     
  * Responsive Web
  
|                   800px 초과 메인화면            |           800px 이하 메인화면 (menu open)        |
| :---------------------------------------------: | :---------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/86645532/200369970-88ae40e9-5c17-4674-9bab-fb7d73fdaa71.PNG" width="300px"> | <img src="https://user-images.githubusercontent.com/86645532/200370036-92eab4ac-9b69-44e7-8f39-0c45bd531c3b.PNG" width="300px" > |


     접속중인 기기의 화면 크기 및 글씨 크기에 대하여 반응형으로 설계되었습니다.



  * Infinite Scroll
 
|                  8개의 데이터 약 0.4s ~ 0.5s           |           60개의 데이터 약 4s ~ 5s        |
| :---------------------------------------------: | :---------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/86645532/200370755-fd471085-3572-4acf-b503-efe1ebb29a65.PNG" > | <img src="https://user-images.githubusercontent.com/86645532/200371050-9cccf3e4-a37f-4491-baad-8ab4d34d948a.PNG" > |


     배포된 상태에서 측정하였으며 네트워크 상태에 따라 상이할 수 있습니다.  
     상품목록이나 구매내역 등 한번에 많은 데이터를 불러올 경우 페이지 로딩속도가 급격하게 늘어나게 됩니다.
     이를 해소하기위해 intersection-observer를 사용하여 스크롤이 최하단인지를 감지하고
     최하단이라면 api를 요청하여 데이터를 점점 추가해가는 방식으로 무한스크롤을 구현하였습니다.  
     
     client에서는 한번에 불러올 데이터의 수(limit)와 가져올 데이터의 시작 위치(skip)을 추가하여 요청하고
     server에서는 필요한 데이터를 분할하여 넘겨줍니다.
     
     
     
     
     
 #### client
 
 ``` javascript
      const option = {
        limit: limit,
        skip: skip + limit,
        id: userId,
        readMore: true,
      };
      
      connectServer(option);
      setSkip((prev) => prev + limit);
```

#### server
``` javascript
  User.findOne(
    { _id: req.body.id },
    {
      purchase: {
        $slice: [req.body.skip, req.body.limit],
      },
    }
  )
```


