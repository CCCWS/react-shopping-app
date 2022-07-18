const { User } = require("../models/User");

const auth = (req, res, next) => {
  //인증 처리 하는곳
  //클라이언트 쿠키에서 토큰을 가져옴
  const token = req.cookies.userCookie;
  //지정한 쿠키 이름

  //토큰을 복화하하여 유저 탐색
  User.findByToken(token, (err, user) => {
    console.log(user);
    if (err) throw err;
    if (user === null) {
      return res.json({ isAuth: false, error: true, test: "test" });
    }

    req.token = token;
    req.user = user; //req에 넘어줌으로써 사용할 수 있게 해줌
    next();
    //없으면 미들웨어에서 못넘어감
  });

  //유저가 있으면 인증 완료
  // 없으면 인증 불가
};

module.exports = { auth };
