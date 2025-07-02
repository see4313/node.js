//fetchAPI.js
fetch("http://localhost:3000/posts/2", {
  method: "delete", // 따로 입력안해주면 기본값이 get 방식 //post:방식으로 지정하면 추가  // 삭제하고싶으면 요청방식이 delete:는 body부분이 필요 없음
  headers: { "Content-Type": "application/json" },
  // body: JSON.stringify({ id: 9, title: "fetch연습", author: "admin" }), //post 방식이라 직접 입력
})
  .then((resolve) => resolve.json())
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
