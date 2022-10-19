const { User } = require("../models/User");

const auth = (req, res, next) => {
  //인증 처리 하는곳
  //클라이언트 쿠키에서 토큰을 가져옴
  const token = req.cookies.userCookie;
  //지정한 쿠키 이름

  //웹에 저장된 쿠키와 동일한 토큰을 가지는 유저를 찾음
  //로그인시 생성된 토큰을 DB와 웹의 쿠키에 저장
  //인증이 필요할경우 두개의 토큰을 비교하여 로그인유저가 맞는지 확인
  //로그아웃을 하게되면 DB의 토큰 제거
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (user === null) {
      return res.json({ isAuth: false });
    }

    req.token = token;
    req.id = user._id; //req에 넘어줌으로써 사용할 수 있게 해줌
    next();
    //없으면 미들웨어에서 못넘어감
  });

  //유저가 있으면 인증 완료
  // 없으면 인증 불가
};

module.exports = { auth };
