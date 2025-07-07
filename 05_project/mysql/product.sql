use dev;
drop table if exists t_category;

SELECT * FROM t_category;
select * from t_seller;
select * from t_image;
select * from t_product;
select * from t_user;

create table t_category(
id int(11) unsigned not null auto_increment,
category1 varchar(100) not null default '',
category2 varchar(100) not null default '',
category3 varchar(100) default '',
primary key(id)
) engine=InnoDB default charset=utf8;



# dump of table t_seller
drop table if exists t_seller;

create table t_seller(
id int(11) unsigned not null auto_increment,
name varchar(100) not null default '',
email varchar(100) not null default '',
phone varchar(20) not null default '',
primary key(id)
) engine=InnoDB default charset=utf8;

# dump of table t_product
drop table if exists t_product;

create table t_product(
id int(11) unsigned not null auto_increment,
product_name varchar(200) not null default '',
product_price int(11) not null default 0,
delivery_price int(11) not null default 0,
add_delivery_price int(11) not null default 0,
tags varchar(10) default null,
outbound_days int(2) not null default 5,
seller_id int(11) unsigned not null default 0,
category_id int(11) unsigned not null default 0,
active_yn enum('Y','N') not null default 'Y',
created_date datetime not null default current_timestamp(),
primary key(id),
key seller_id(seller_id),
key category_id (category_id),
constraint t_product_ibfk_1 foreign key (seller_id) references t_seller(id),
constraint t_product_ibfk_2 foreign key(category_id) references t_category(id)
) engine=InnoDB default charset=utf8;


# dump of table t_image
drop table if exists t_image;

create table t_image (
  id int(11) unsigned not null auto_increment,
  product_id int(11) unsigned not null,
  type int(1) not null default 1 comment '1-썸네일, 2-제품이미지, 3-제품설명이미지',
  path varchar(150) not null default '',
  primary key(id),
  key product_id (product_id),
  constraint t_image_ibfk_1 foreign key (product_id) references t_product(id)
) engine=InnoDB default charset=utf8;


# dump of table t_user
drop table if exists t_user;

create table t_user(
email varchar(50) not null default '',
type int(1) not null default 1 comment '1-buyer, 2-seller',
nickname varchar(50) default null,
primary key(email)
) engine=InnoDB default charset=utf8;

select * from t_user;

