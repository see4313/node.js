const url = new URL(
  "https:/user:pass@sum.examplt.com:8080/a/b/c?query=name&num=1#node"
);
const params = url.searchParams;

console.log(params.get("query")); // 파라미터 이름을 넣어주면 값을 반환 (query = name, )
console.log(params.get("num")); //(num = 1) 으로 출력됨
