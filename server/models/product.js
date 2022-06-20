const express = require("express");
const app = express.Router();
const multer = require("multer");
const fs = require("fs");
const { ProductData } = require("./ProductData");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  }, //파일 저장 경로

  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
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
  const productData = new ProductData(req.body);
  productData.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
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

app.post("/productList", (req, res) => {
  const skip = parseInt(req.body.skip, 10);
  const limit = parseInt(req.body.limit, 10);
  const gte = parseInt(req.body.price[0], 10); //최소
  const lte = parseInt(req.body.price[1], 10); //최대

  const category = req.body.category !== "전체" && true;

  // const price =
  //   req.body.price.length !== 0 &&  $gte: ${gte}, $lte: ${lte};

  const arg = {
    price: { $gte: gte, $lte: lte },
  };

  if (req.body.category !== "전체") {
    arg.category = req.body.category;
  }
  // if (req.body.price.length !== 0) {
  //   arg.price = { $gte: gte, $lte: lte };
  // }

  // delete arg.category;
  //등록한 상품 리스트를 가져옴
  ProductData.find(arg)
    .sort({ createdAt: -1 }) //mongoDb의 ProductData의 리스트를 조건없이 가져옴 필터기능 구현시 괄호안에 조건 입력
    .populate("writer") //현재 저장된 id에는 암호회 되어있음. 해당 id에 대한 정보를 모두 가져옴
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, productInfo });
    });
});

module.exports = app;
