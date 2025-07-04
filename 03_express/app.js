//app.js (서버프로그램)
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cutomerRoute = require("./routes/customer");
const productRoute = require("./routes/product"); // 밑에 app 에 임포트한 라우트 정보들을 담음

const app = express(); //express서버의 instance 생성
// application에 json 요청
app.use(bodyParser.json());
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//파일 업로드 . multer.
//저장경로와 파일명 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //저장경로
    cb(null, "uploads"); // cb() = callback 함수, // uploads 경로에 올림
  },
  filename: function (req, file, cb) {
    // 업로드되는 파일 이름
    cb(null, Date.now() + "-" + file.originalname); // date.now는 현재시간정보활용 해서 중복되지 않게! // 파일명은 중복되면 안됨
  },
});

//Multer 인스턴스 생성
const upload = multer({
  storage: storage, // 저장
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일의 크기제한
  fileFilter: function (req, file, cb) {
    const mimetype = /jpg|jpeg|png|gif/.test(file.mimetype); // cmddp mimetype에서 파일의 종류들을 테스트해서 걸러줌
    if (mimetype) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

// 동일출처 원칙 // 모든 서버에서의 요청 허락
app.use(cors()); // 원칙을 추가하고싶으면 origin해서 추가하고싶은 url 입력해주면 됨

app.get("/", (req, res) => {
  // req요청, res응답
  fs.readFile("./public/index.html", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

// express에서 에러처리하는 미들웨어
app.use((err, req, res, next) => {
  console.log();
});

//첨부처리(파일을 첨부해주는).
app.post("/upload", upload.array("myFile"), (req, res) => {
  //array면 다건으로 선택할수 있게끔 html에서도 multiple로 변경해주기
  // 첨부하는 파일이 하나면 single에 파일이름 적기
  console.log(req.files); // 업로드된 파일의 정보
  console.log(req.body); // 요청된 파일의 몸체
  if (!req.files) {
    res.send("이미지처리가능");
  } else {
    res.send("업로드 완료");
  }
});

//동일출처원칙
app.get("/getCors", (req, res) => {
  let result = { id: "user01", name: "Son" };
  res.json(result);
});

// 첨부파일 업로드화면생성
app.get("/upload", (req, res) => {
  fs.readFile("./public/upload.html", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

// app.get("/customer", (req, res) => {
//   // res.send("/customer 경로입니다");
// });
// app.post("/customer", (req, res) => {
//   // res.send("/customer 경로의 post 요청입니다");
//   res.json({ id: 10, name: "IyoungSon" });
// });

//bodyParse를 활용해서 요청정보의 body정석를 해석
app.post("/json-data", (req, res) => {
  console.log(req.body);
  res.send("json요청");
});
app.post("/form-data", (req, res) => {
  console.log(req.body);
  res.send("form-data요청");
});

// 라우팅 정보를 파일로 분리
app.use("/customer", cutomerRoute);
app.use("/product", productRoute);

app.listen(3000, () => {
  console.log("http://localhost:3000 서버실행.");
}); ///3000포트 실행
