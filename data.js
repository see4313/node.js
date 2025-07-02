const members = [
  { id: "guest", name: "손님" },
  { id: "user", name: "회원" },
  { id: "admin", name: "관리자" },
];

//화살표 함수 사용
let add = (num1, num2) => num1 + num2;

module.exports = { members, add }; // module.exports는 공통으로 사용되어지는 기능을 다른파일1에 작성하고 다른파일2 에서 값을 가지고옴
