// app.js 가 자바에선 frontControl 의 역할
const express = require("express");
const bodyParser = require("body-parser"); // json 형태로 넘기기 위한 임포트
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
require("dotenv").config({ path: "./sql/.env" }); // .env는(env안에는 환경변수들이 있음) 개발자 외에 아무도 볼수 없게끔 가리는 파일
const nodemailer = require("./nodemailer");

const mysql = require("./sql"); // index.js 에 있는것 불러와서 쓰기(임포트)

//인스턴스 생성
const app = express(); //위에 모듈을 쓰는 인스턴스를 생성하는것
app.use(bodyParser.json()); // json 형태로 담기위함

app.get("/", (req, res) => {
  res.send("root경로");
});

//엑셀 업로드 -> DB insert
//multer.
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
});
//이메일 발송화면
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html")); // dirname은 현재경로를 말함 //sendFile메소드는 절대경로를 기준으로 보여주고싶을때 사용
});

//첨부처리(파일을 첨부해주는).
app.post("/excel", upload.single("myFile"), (req, res) => {
  //array면 다건으로 선택할수 있게끔 html에서도 multiple로 변경해주기
  // 첨부하는 파일이 하나면 single에 파일이름 적기
  console.log(req.file); // 업로드된 파일의 정보
  console.log(req.body); // 요청된 파일의 몸체
  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`); // 업로드한 엑셀 파일
  const firstSheetName = workbook.SheetNames[0]; // 여러개의 시트중에 첫번째 시트
  //시트명으로 첫번쨰 시트 가져오기
  const firstSheet = workbook.Sheets[firstSheetName]; // Sheets중에서 sheet이름이 firstSheetName인아이를 변수에 담아줌
  //첫번째 시트의 데이터를 json으로 생성
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet); //담은 firstSheet를 json형식으로 바꿔서 또 다른 변수에 담아줌
  console.log(firstSheetJson);

  //정렬코드(sort)
  //sort의 조건은 앞에꺼에서 뒤에걸 뺏을때 음수가 나오게끔 해주는게 오름차순 (sort), 반대로 양수가 나오게 하는게 내림차순
  const fsj = firstSheetJson // {a}, {c}, {k}, {p} //fsj 에는 순서와 상관없이 반복됨
    .sort((a, b) => {
      return a.name < b.name; // 오름차순(1,2,4,6), 내림차순  // =(a.name - b.name < 0;)
    });
  //반복문 활용해서 insert해서 DB에 저장
  fsj.forEach(async (element) => {
    let result = await mysql.query("customerInsert", element);
  });

  if (!req.file) {
    res.send("엑셀처리가능");
  } else {
    res.send("업로드 완료");
  }
});

// 📁 엑셀로 내보내기 라우트
app.get("/excel/download", async (req, res) => {
  try {
    // 1. DB에서 데이터 가져오기
    const result = await mysql.query("customerList");

    // 2. JSON → 엑셀 시트로 변환
    const worksheet = xlsx.utils.json_to_sheet(result);

    // 3. 시트를 workbook으로 감싸기
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Customers");

    // 4. 파일 이름과 경로 설정
    const filename = `customers-${Date.now()}.xlsx`;
    const filepath = path.join(__dirname, "uploads", filename);

    // 5. 파일 저장
    xlsx.writeFile(workbook, filepath);

    // 6. 사용자에게 다운로드 제공
    res.download(filepath, filename, (err) => {
      if (err) {
        console.error("다운로드 오류:", err);
        res.status(500).send("파일 다운로드 중 오류 발생");
      }
    });
  } catch (error) {
    console.error("엑셀 다운로드 오류:", error);
    res.status(500).send("엑셀 다운로드 실패");
  }
});
// // 폴더 없으면 생성
// const downloadDir = path.join(__dirname, "downloads");
// if (!fs.existsSync(downloadDir)) {
//   fs.mkdirSync(downloadDir);
// }

//이메일 전송
app.post("/email", async (req, res) => {
  try {
    let result = await nodemailer.sendEmail(req.body.param);
    console.log(result);
    res.json({ retCode: "success", retVal: result }); // json 형태로 { "retCode": "success" }
  } catch (err) {
    res.json({ retCode: "fail" });
  }
});

//조회 (비동기방식) // 자바로 따지면 fromcontrol처럼 url 하고 처리할것들 적어주기
app.get("/customers", async (req, res) => {
  try {
    let result = await mysql.query("customerList"); // 쿼리호출
    res.send(result);
  } catch (err) {
    res.send("에러발생=>", err);
  }
});

//추가 (비동기방식)
//어떤 형식으로 넘어오는지 확인해주는게 body-path 위에 임포트 되있음
app.post("/customer", async (req, res) => {
  try {
    console.log(req.body);
    let data = req.body.param; // key, value 형태인지 json형태인지 // postman에서 보면 param 안에 있는 josn 형태임 그래서 param 안에 있는 json형태의 값들만 가지고옴
    let result = await mysql.query("customerInsert", data); // 요청방식을 json형태로 넘김
    res.send(result); // 출력된걸 send메소드에 담기
  } catch (err) {
    res.send("에러발생=>", err);
  }
});

//업데이트(수정)
app.put("/customer", async (req, res) => {
  try {
    let data = req.body.param; // 배열안에 첫번째 파라미터는 객체, 두번째 파라미터는 값
    let result = await mysql.query("customerUpdate", data);
    res.send(result);
  } catch (err) {
    res.send("에러발생 =>", err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 running...!!!");
});

// 삭제 경로에다가 값을 포함시켜서 처리방식 (http://localhost:3000/customer/8/Hong)
// 자바에서 같은 의미 (http://localhost:3000/customer/?id=8&name=Hong)
app.delete("/customer/:id", async (req, res) => {
  // get방식일떄 여러개의 파라미터를 넘기고 싶으면 /해서 계속 써주면 됨
  try {
    console.log(req.params);
    let { id } = req.params; // params:{ id:8 } 로 출력
    let result = await mysql.query("customerDelete", id);
    res.send(req.params);
  } catch (err) {
    res.send("에러발생 =>", err);
  }
});

// let data = ["희영", "hi@email.com", "010-3333-3333"];
// data = [
//   {
//     name: "희영",
//     email: "hi@email.com",
//     phone: "010-3333-3333",
//     adress: "",
//   },
//   1,
// ];

// console.log(custSql["customerList"]);
// query("customerInsert", {
//   name: "홍길동",
//   email: "hong@email.com",
//   phone: "010-4444-4444",
//   adress: "",
// });

// query("customerDelete", "5");

// query("customerUpdate", [
//   {
//     name: "이창호",
//     email: "lee@email.com",
//     phone: "010-1111-1111",
//     adress: "",
//   },
//   1,
// ]);
