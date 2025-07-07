const express = require("express");
require("dotenv").config({ path: "./mysql/.env" }); // .env는(env안에는 환경변수들이 있음) 개발자 외에 아무도 볼수 없게끔 가리는 파일
const fs = require("fs");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser"); // bodyParse를 사용 안할거면 express 내장객체 사용

const app = express(); // 인스턴스 생성

//body-parser
app.use(express.json());

app.listen(3000, () => {
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

// 파일 다운로드
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params; //params = :productId를 말함
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`; // ${__dirname} => d:/dev/git/node/ 안에 경로를 말함
  //응답정보.
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath)) {
    res.send("파일이 없습니다");
    return res.status(404).json({ error: "Con not found file" });
  } else {
    fs.createReadStream(filepath).pipe(res); // pipe라는 메소드(복사)는 최종목적지에다가 createReadStream(filepath)에 만들어진걸 최종 복사해서 res(응답)에 전달
    // res.send("다운로드 완료");
  }
});

// 파일 업로드

// :alias는 파라미터값
app.post("/api/:alias", async (req, res) => {
  //라우팅정보를 통해서 실행할 쿼리지정. localhost:3000/api/productList
  // console.log(req.params.alias);
  // console.log(req.body.param); // param: {product_name: ~} 의 방식으로 값을 넣어줘야됨
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
