//path.js
const path = require("path");

console.log(__filename); // 현재파일의 경로를 출력
console.log(path.basename(__filename)); // basename 최종마지막파일이름 출력
console.log(path.basename(__filename, ".js")); //.js 파일 출력

let result = path.format({
  // 속성들을 하나의 경로로 조합시켜주는게 path
  base: "sample.txt",
  dir: "/home/temp",
});
console.log(result);

result = path.parse("/home/temp/sample.txt"); // 속성들의 경로를 구분시켜주는게 parse
console.log(result);
