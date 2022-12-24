const express = require("express");
const app = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.loadFromPath(__dirname + "/../config/s3.json");

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "shopping-img",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

app.post("/s3Upload", upload.single("image"), (req, res) => {
  return res.status(200).json({ fileName: res.req.file.key });
});

// app.post("/test", (req, res) => {
//   console.log(req.body);

//   return res.status(200).json({ success: true, id: 1 });
// });

// upload.array("image", 5),

module.exports = app;
