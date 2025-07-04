const nodemailer = require("nodemailer");

const config = {
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "05s6oasd@daum.net",
    pass: "xqemdodzwzzyesvr",
  },
};

const sendEmail = async (data) => {
  //Promise객체로 반환 (await함수를 사용하려면 async사용해줘야됨)
  return new Promise(async (resolve, reject) => {
    let tp = nodemailer.createTransport(config);
    try {
      let result = await tp.sendMail(data);
      console.log("메일성공", result);
      resolve(result); // 메일에 성공하면 result에 담기
    } catch (err) {
      console.log("메일실패", err);
      //예외나 에러가 있으면 reject에 담기
      reject(err);
    }
  });
};

module.exports = {
  sendEmail,
};
