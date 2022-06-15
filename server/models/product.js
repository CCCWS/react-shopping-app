const express = require("express");
const { append } = require("express/lib/response");
const app = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  }, //파일 저장 경로

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}`);
  }, //저장할때 파일명
});

let upload = multer({ storage: storage }).single("file");

app.post("/img", (req, res) => {
  //가져온 이미지 저장
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
    //front로 저장된 파일의 경로와 이름 전달
  });
});

module.exports = app;
