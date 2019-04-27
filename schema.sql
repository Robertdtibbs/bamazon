create database bamazon_db;

use bamazon_db;
create table inventory (
item_id int auto_increment primary key,
product_name varchar(50) not null,
department_name varchar(50) not null,
price float(10000) not null,
stock_quantity int(10000) not null
);