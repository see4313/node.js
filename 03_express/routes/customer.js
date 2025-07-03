//customer.js
const express = require("express");

const router = express.Router();

// 라우팅 정보생성
router.get("/customers", (req, res) => {
  // get요청 : 조회
  res.send("/customer 루트디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/customer POST  요청");
});

router.put("/update", (req, res) => {
  res.send("/customer PUT요청");
});

router.delete("/delete", (req, res) => {
  res.send("/customer DELETE 요청");
});

module.exports = router;
