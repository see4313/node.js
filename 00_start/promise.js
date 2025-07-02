//promise.js

//promise 객체 호출
const promise = new Promise(function (resolve, reject) {
  // 첫번째 매개변수는 성공한 함수반환 , 두번째 매개변수는 실패한 함수반환 (resolve, reject 변수이름)
  let run = parseInt(Math.random() * 2); //
  // falsy(거짓) => 0, null, ""(공백), undefied 이외에는 truty.
  setTimeout(function () {
    if (run) {
      resolve({ id: "user", name: "회원" });
    } else {
      reject(new Error("에러호출"));
    }
  }, 1000);
});

promise // 정상적으로 실행되면 result가 실행 그럼 ok가 출력 error가 나면 reject가 실행 그럼 err 출력
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    //
    console.log(err);
  }); // then메소드

//ajax call.
fetch(
  "https://charleslee-6617723.postman.co/workspace/3461b914-2d4f-41c9-8c64-f24308da11f5/request/45560951-edf6f244-dc04-42e6-a962-02a67c0332d1?action=share&source=copy-link&creator=45560951&ctx=documentation"
) //
  .then((json) => json.json()) //
  .then((result) => {
    console.log(result);
  }) //
  .catch((err) => console.log(err));
