const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const { User } = require("./models/User");

const { auth } = require("./middleware/auth");
const config = require("./config/key");

const port = process.env.PORT || 3001;
//bodyParser > 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게해줌
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" })); // json파일을 분석해서 가져옴
app.use(cors());

/////
app.use("/api/product", require("./routes/product")); //해당 경로로 이동하여 처리
app.use("/api/user", require("./routes/user"));
app.use("/uploads", express.static("uploads")); //nodejs에서 정적파일을 제공

mongoose
  .connect(config.mongoURI)
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  // } 몽고DB 버전 6.0이상에선 자동처리

  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`port : ${port}`));
