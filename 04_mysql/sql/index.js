//mysql/app.js 에 있는것들과 같은 경로라 index.js 로 이동
const mysql = require("mysql2");
const custSql = require("./customerSql"); // {custList, }

const pool = mysql.createPool({
  //.ENV에 지정해놓은 변수명대로 적어주면 됨
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT,
});

async function query(alias, values) {
  //(custSql["customerList"]) 경로에 있는 쿼리문들을 가지고올수있움
  return new Promise((resolve, reject) => {
    pool.query(custSql[alias], values, (err, result) => {
      if (err) {
        console.log("처리중 에러", err);
      } else {
        resolve(result);
      }
    });
  });
} // end of query.

//쿼리와 관련된 것들 exports
module.exports = { query }; // 위에 function query exports 해줌
