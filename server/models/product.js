const express = require("express");
const app = express.Router();
const multer = require("multer");
const fs = require("fs");
const { productData } = require("../models/productData");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  }, //파일 저장 경로

  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    if (["png", "jpg", "jpeg"].includes(ext)) {
      cb(null, `${Date.now()}`);
    } else {
      cb(new Error("이미지만 업로드 가능"));
    }
  }, //저장할때 파일명
});

const upload = multer({ storage: storage });

app.post("/img", upload.single("file"), (req, res) => {
  return res.json({
    success: true,
    file: res.req.file,
  }); //front로 저장된 파일의 경로와 이름 전달
});

app.post("/write", (req, res) => {
  //받은 정보를 DB에 저장
  console.log(productData(req.body));
});

app.post("/delImg", async (req, res) => {
  if (fs.existsSync(`uploads/${req.body.image}`)) {
    // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
    try {
      fs.unlinkSync(`uploads/${req.body.image}`);
      return res.json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
      });
    }
  }
});

module.exports = app;
