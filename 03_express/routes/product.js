//product.js
const express = require("express"); // const { Router } = require("express"); 처럼도 사용 가능
const router = express.Router();

// 라우팅 정보생성
router.get("/products", (req, res) => {
  // get요청 : 조회
  res.send("/products 루트디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/products POST  요청");
});

router.put("/update", (req, res) => {
  res.send("/products PUT요청");
});

router.delete("/delete", (req, res) => {
  res.send("/products DELETE 요청");
});

module.exports = router;
