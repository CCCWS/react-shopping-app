const express = require("express");
const app = express.Router();
const multer = require("multer");
const fs = require("fs");
const { ProductData } = require("../models/productData");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  }, //파일 저장 경로

  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
      cb(null, `${Date.now()}.${ext}`);
    } else {
      cb(new Error("이미지만 업로드 가능"));
    }
  }, //저장할때 파일명
});

const upload = multer({ storage: storage });

app.post("/img", upload.single("file"), (req, res) => {
  //서버에 이미지파일 업로드
  return res.json({
    success: true,
    file: res.req.file,
  }); //front로 저장된 파일의 경로와 이름 전달
});

app.post("/write", (req, res) => {
  //새로운 상품 등록
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
  //상품 등록 페이지에서 업로드 이미지 삭제
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
  //상품목록 가져오기
  const arg = {};

  if (req.body.price) {
    arg.price = {
      $gte: parseInt(req.body.price[0], 10),
      $lte: parseInt(req.body.price[1], 10),
    };
  }

  if (req.body.category) {
    if (req.body.category !== "전체") {
      arg.category = req.body.category;
    }
  }

  if (req.body.searchValue) {
    if (req.body.searchValue.length > 0) {
      arg.title = { $regex: req.body.searchValue, $options: "i" };
    }
  }

  //등록한 상품 리스트를 가져옴
  ProductData.find(arg)
    .sort({ createdAt: -1 }) //mongoDb의 ProductData의 리스트를 조건없이 가져옴 필터기능 구현시 괄호안에 조건 입력
    .populate("writer") //현재 저장된 id에는 암호회 되어있음. 해당 id에 대한 정보를 모두 가져옴
    .skip(parseInt(req.body.skip, 10))
    .limit(parseInt(req.body.limit, 10))
    .exec((err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, productInfo });
    });
});

app.post("/productDetail", (req, res) => {
  //특정 상품 상세정보
  ProductData.findOneAndUpdate(
    { _id: req.body.id },
    {
      $inc: {
        views: 1,
      },
    },
    { new: true }
  )
    .populate("writer")
    .exec((err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, productInfo });
    });
});

app.post("/cart", (req, res) => {
  //사용자의 카트에 등록된 상품 목록
  ProductData.find({
    _id: { $in: req.body },
  })
    .populate("writer")
    .exec((err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, productInfo });
    });
});

app.post("/successBuy", (req, res) => {
  //구매 성공시 처리
  ProductData.findOneAndUpdate(
    { _id: req.body.id },
    {
      $inc: {
        sold: req.body.purchasesCount,
        count: -req.body.purchasesCount,
      },
    },
    { new: true },

    (err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).send({
        success: true,
        productInfo: productInfo,
      });
    }
  );
});

app.post("/myProduct", auth, (req, res) => {
  //사용자가 등록한 상품 목록
  ProductData.find({
    writer: { $in: req.user._id },
  })
    .sort({ createdAt: -1 })
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).send({
        success: true,
        productInfo: productInfo,
      });
    });
});

app.post("/viewSort", (req, res) => {
  ProductData.find()
    .sort({ views: -1 })
    .limit(3)
    .exec((err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, productInfo });
    });
});

app.post("/soldSort", (req, res) => {
  ProductData.find()
    .sort({ sold: -1 })
    .limit(3)
    .exec((err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true, productInfo });
    });
});

module.exports = app;
