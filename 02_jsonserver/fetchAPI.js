//fetchAPI.js
async function json_func() {
  // async - away 사용하면 구문이 간편해진당
  try {
    let promise = await fetch("http://localhost:3000/posts/5", {
      method: "put", // 따로 입력안해주면 기본값이 get 방식 //post:방식으로 지정하면 추가 //put:수정  // 삭제하고싶으면 요청방식이 delete:는 값을 받는 부분인 headers, body부분이 필요 없음
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "5", title: "진심개더워;;", author: "admin" }), //post 방식이라 직접 입력
    });
    let resolve = await promise.json();
    console.log("결과=>", resolve);

    promise = await fetch("http://localhost:3000/posts");
    resolve = await promise.json();
    console.log("결과=>", resolve);
  } catch (err) {
    console.log(err);
  }
} //end of json_func
json_func(); //함수호출
