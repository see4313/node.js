module.exports = {
  customerList: "select * from customers",
  customerInsert: "insert into customers set ?",
  customerUpdate: "update customers set ? where id = ?",
  customerDelete: "delete from customers where id =?",
};

//"select * from customers"
//"insert into customers (name, email, phone) values (?,?,?)"
//"insert into customers set ?"
//"update customers set ? where id = ?"
