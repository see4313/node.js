const express = require("express");
const bodyParser = require("body-parser"); // json 형태로 넘기기 위한 임포트
require("dotenv").config({ path: "./sql/.env" });

console.log(process.env.HOST);
console.log(process.env.USER);

const mysql = require("./sql"); // index.js 에 있는것 불러와서 쓰기(임포트)

const app = express();
app.use(bodyParser.json()); // json 형태로 담기위함

app.get("/", (req, res) => {
  res.send("root경로");
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
