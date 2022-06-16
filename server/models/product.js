const express = require("express");
const { append } = require("express/lib/response");
const app = express.Router();
const multer = require("multer");

let test = false;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  }, //파일 저장 경로

  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    if (["png", "jpg", "jpeg"].includes(ext)) {
      cb(null, `${Date.now()}`);
    } else {
      cb(new Error("Only images are allowed"));
    }
  }, //저장할때 파일명
});

const upload = multer({ storage: storage });

app.post("/img", upload.single("file"), (req, res) => {
  console.log(res.req.file.path);
  return res.json({
    success: true,
    file: res.req.file,
  }); //front로 저장된 파일의 경로와 이름 전달
});

module.exports = app;
