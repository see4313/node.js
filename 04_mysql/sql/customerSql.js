module.exports = {
  customerList: "select * from customers", // 키 : 쿼리 ( app 에서 키를 넣으면 쿼리를 반환해줌)
  customerInsert: "insert into customers set ?",
  customerUpdate: "update customers set ? where id = ?",
  customerDelete: "delete from customers where id =?",
};

//"select * from customers"
//"insert into customers (name, email, phone) values (?,?,?)"
//"insert into customers set ?"
//"update customers set ? where id = ?"
