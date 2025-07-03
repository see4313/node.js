const mysql = require("mysql2");
const custSql = require("./sql/customerSql"); // {custList, }

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});
let data = ["희영", "hi@email.com", "010-3333-3333"];
data = [
  {
    name: "희영",
    email: "hi@email.com",
    phone: "010-3333-3333",
    adress: "",
  },
  1,
];
// console.log(custSql["customerList"]);
function query(alias, values) {
  //(custSql["customerList"]) 경로에 있는 쿼리문들을 가지고올수있움
  pool.query(custSql[alias], values, (err, result) => {
    if (err) {
      console.log("처리중 에러", err);
    } else {
      console.log(result);
    }
  });
}
// query("customerInsert", {
//   name: "홍길동",
//   email: "hong@email.com",
//   phone: "010-4444-4444",
//   adress: "",
// });

// query("customerDelete", "5");

query("customerUpdate", [
  {
    name: "이창호",
    email: "lee@email.com",
    phone: "010-1111-1111",
    adress: "",
  },
  1,
]);
