//crypto.js
const crypto = require("crypto");

let pw = crypto.createHash("sha512").update("pw1234").digest("base64");
// console.log(pw);

//salting 암호화. (salting 해야 매번 값이 바뀜)
const createSalt = () => {
  return new Promise((resolve, reject) => {
    // 동기방식을 비동기방식으로 만들어주기 위해서 promise객체안에다가 담음
    crypto.randomBytes(64, (err, buf) => {
      // 값이 있으면 err에 담기고 값이 없으면 buf에 담김
      if (err) {
        reject(err);
      }
      resolve(buf);
    });
  });
};
//createSalt() //
//.then((result) => console.log(result.toString("base64"))); //result 값이 buf 값임

// salt방식으로 암호화.
const createCryproPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      // pbkdf2함수는 암호화해주는 함수=> 사용할떄는 salt 라는 매개값이 와야됨
      if (err) {
        reject(err);
      }
      resolve({ slat: salt, password: key.toString("base64") });
    });
  });
};

//password 생성.
async function main() {
  const salt = await createSalt();
  // console.log(salt);
  const pw = await createCryproPassword("1111", salt); // 1111이 실제 password
  console.log(pw.password);
}

main(); // 함수호출
