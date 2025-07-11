const express = require("express");
require("dotenv").config({ path: "./mysql/.env" }); // .env는(env안에는 환경변수들이 있음) 개발자 외에 아무도 볼수 없게끔 가리는 파일
const fs = require("fs");
const path = require("path"); //path모듈
const cors = require("cors");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser"); // bodyParse를 사용 안할거면 express 내장객체 사용

const app = express(); // 인스턴스 생성(서버)

//업로드 경로확인
let uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  //D:/
  fs.mkdirSync(uploadDir);
}

//body-parser
app.use(express.json({ limit: "10mb" }));
app.use(cors()); //소스가 다른곳에서 들어오더라도 실행되게 해줌 (3000번 포트와 8080포트) // CORS 처리

app.listen(3000, () => {
  // listen 은 서버 실행하겠다는 메소드
  console.log("npm install");
  console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

//html에서 script열어주기위함(index파일 열어주는 작업)
app.get("/fileupload", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // sendFile메소드는 특정위치에 있는 파일을 열어줄때 사용함 //__dirnames는 현재경로를 가르킴
  //위에 임포트한 path모듈을 사용하면 join 구문사용가능 저게 아니면 res.sendFile(__dirname + "/public/index.js")로 사용됨
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
app.post("/upload/:filename/:pid/:type", (req, res) => {
  // 추가로 파라미터가 더 있으면 : 사용해서 더 적어주면 됨
  const { filename, pid, type } = req.params; //{filename: 'sample.jpg', product: 3}
  // const filePath = `${__dirname}/uploads/${pid}/${filename}`; //../05_project/uploads/sample.jpg와 같은 의미   // html/script처럼 join사용하거나 ``(백틱)도 사용가능

  // 8번 폴더를 만들어주는 코드 (8번 폴더가 없으면 폴더를 만들어서 거기에 이미지 넣음)
  let productDir = path.join(uploadDir, pid);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir);
  }

  const safeFilename = path.basename(filename); // 경로공격
  const filePath = path.join(uploadDir, pid, safeFilename);

  try {
    let data = req.body.data.slice(req.body.data.indexOf(";base64,") + 8); // 요청정보의 body의 data라는 속성읽어옴
    //slice 메소드를 사용해서 base64다음으로 8자리 잘라서 사용
    fs.writeFile(filePath, data, "base64", async (err) => {
      //pid, type, filename 를 DB에 instert
      await query("productImageInsert", [
        { product_id: pid, type: type, path: filename },
      ]);
      if (err) {
        res.send("err");
        return res.status(500).send("error");
      }
      res.send("success");
    });
  } catch (err) {
    res.status(400).send("invalid data");
  }
});

//데이터 쿼리하는 부분
// :alias는 파라미터값
app.post("/api/:alias", async (req, res) => {
  //라우팅정보를 통해서 실행할 쿼리지정. localhost:3000/api/productList
  // console.log(req.params.alias);
  console.log(req.body.param); // param: {product_name: ~} 의 방식으로 값을 넣어줘야됨
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});

//연결된 뷰
app.get("/todoList", async (req, res) => {
  const result = await query("todoList");
  console.log(result);
  res.json(result);
});

//todo 삭제
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("todoDelete", id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});
