const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

// const cors = require("cors");

const mongoose = require("mongoose");
const config = require("./config/key");

const port = process.env.PORT || 3001;
//bodyParser > 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게해줌
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

/////
app.use("/api/product", require("./routes/product")); //해당 경로로 이동하여 처리
app.use("/api/user", require("./routes/user"));
app.use("/api/s3", require("./routes/s3"));
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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
// });

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.listen(port, () => console.log(`port : ${port}`));
