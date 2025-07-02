// 01_module/console.js
const { Console } = require("console"); // module에서 가지고와서 쓸 수 있는 내장 객체 console
const fs = require("fs");
const express = require("express"); //외부모듈 (따로 설치해줘야됨)

//sample폴더 하위에 output.log 파일생성
const output = fs.createWriteStream("./sample/output.log", { flags: "a" }); // createWriteStream은 파일 생성
//sample폴더 하위에 errlog.log 파일생성
const errlog = fs.createWriteStream("./sample/errlog.log", { flags: "a" }); // error를 담기위한 파일 생성

const logger = new Console({
  stdout: output,
  stderr: errlog,
});

logger.log("로그기록하기."); // 파일은 위에서 생성하고 출력은 여기서했음
logger.error("에러로그기록하기");
console.log("end ");
