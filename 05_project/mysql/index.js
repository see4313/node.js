//mysql/app.js 에 있는것들과 같은 경로라 index.js 로 이동
const mysql = require("mysql2");
const sql = require("./product.js"); // {custList, }

// db에서 사용할수 있게끔 환경변수 만들어줌
const pool = mysql.createPool({
  //.ENV에 지정해놓은 변수명대로 적어주면 됨
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT,
});

// console.log(sql["productList"]); //쿼리문에 있는 productList를 불러옴

async function query(alias, values = [], where = "") {
  //(custSql["customerList"]) 경로에 있는 쿼리문들을 가지고올수있움
  return new Promise((resolve, reject) => {
    console.log(sql[alias].query + where);
    pool.query(sql[alias].query + where, values, (err, result) => {
      // 실행이 되면 result에 담고, 실행에 실패하면 err변수에 담음
      if (err) {
        console.log("처리중 에러", err);
      } else {
        resolve(result); // 실패했을때는 reject변수에 담아줌, 성공하면 resolve함수에 담아줌
      }
    });
  });
} // end of query.

//쿼리와 관련된 것들 exports
module.exports = { query }; // 위에 function query exports 해줌
