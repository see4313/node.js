const { members, add, getPerson } = require("./data.js");

console.log("hello.world");
let myName = "홍길동";
let age = 20;

if (age > 20) {
  console.log(`${myName}성인`); // 백틱{``} 안에서는 문자열로 입력해서 ${}사용가능
} else {
  console.log(`${myName}미성인`);
}

//console.log(members);
//console.log(add(10, 20));

members.forEach((item, idx) => {
  if (idx > 0) {
    console.log(item);
  }
}); //function(item, idx, array)

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2]; // 펼침 연산자 // 배열들을 변수에 담을 수 있음 // 배열안의 요소들을 다 펼쳐서 보여줌
//console.log(result);

//Object Destructuring 방식
let { firstName, lastName, email } = getPerson(); // = {firstName, lastName....}  //Person에 있는 객체들을 변수에 담기가능
console.log(firstName, lastName, email);

//Array Destructuring 방식
function getScores() {
  return [70, 80, 90, 50, 60, 40]; // ...z 하면 z안에 z부터 나머지값들이 배열형태로 다 들어감 (x=70, y=80 z=90[50, 60, 40])
}
let [x, y, ...z] = getScores(); //getScores()가 배열을 호출
//scoreAry[0] 형태로 출력해야되는데 [x],[y]의 방식으로 반환 가능
//console.log(x, y, z);  // z = [90, 60, 50] => 90, 60, 50

function sumAry(...ary) {
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}
sumAry(1, 2, 3, 4, 5, 6, 7, 8);
