drop database bamazon_db;
create database bamazon_db;

use bamazon_db;
create table inventory (
item_id int auto_increment primary key,
product_name varchar(50) not null,
department_name varchar(50) not null,
price float not null,
stock_quantity int(255) not null
);

insert into inventory(product_name, department_name, price, stock_quantity)
values("iWatch", "technology", 400, 150);

insert into inventory(product_name, department_name, price, stock_quantity)
values("iPhone", "technology", 1000, 300);

insert into inventory(product_name, department_name, price, stock_quantity)
values("iPad", "technology", 600, 100);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Hydro Flask", "Outdoor", 50, 1000);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Climbing Ropes", "Outdoor", 100, 500);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Coleman Stove", "Outdoor", 300, 30);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Football", "Sports", 20, 600);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Baseball", "Sports", 10, 2000);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Volleyball", "Sports", 20, 300);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Lawn Mower", "Yard Maintenance", 50, 1500);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Weed Wacker", "Yard Maintenance", 70, 600);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Hedge Trimmers", "Yard Maintenance", 110, 140);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Knee Brace", "Medical", 40, 35);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Wrist Brace", "Medical", 101, 25);

insert into inventory(product_name, department_name, price, stock_quantity)
values("Ankle Brace", "Medical", 15, 10);

select * from inventory;