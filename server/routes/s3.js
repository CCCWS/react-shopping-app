const express = require("express");
const app = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3-transform");
const aws = require("aws-sdk");
const sharp = require("sharp");

aws.config.loadFromPath(__dirname + "/../config/s3.json");

const s3 = new aws.S3();
const bucketName = "cws-shopping-s3";
const maxSize = 30 * 1024 * 1024; //최대 3mb

//파일명 중복 방지를 위하여 랜덤한 이름으로 업로드
const rendomName = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let temp = "";

  for (let i = 0; i <= 11; i++) {
    temp += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return temp;
};

//업로드 미들웨어
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    // transforms: [
    //   {
    //     key: function (req, file, cb) {
    //       cb(null, `${Date.now()}_${rendomName()}`);
    //     },
    //     transform: function (req, file, cb) {
    //       cb(null, sharp().resize(100, 100));
    //     },
    //   },
    // ],
    transforms: [
      {
        key: function (req, file, cb) {
          fileName = `${Date.now()}_${rendomName()}.webp`;
          cb(null, fileName);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().toFormat("webp"));
        },
      },
    ],
  }),
});

//이미지 업로드

app.post("/s3Upload", upload.single("image"), (req, res) => {
  return res.status(200).json({ fileName: req.file });
});

//이미지 삭제
app.post("/s3Delete", (req, res) => {
  s3.deleteObject(
    {
      Bucket: bucketName,
      Key: `${req.body.img}`,
    },
    (err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = app;
