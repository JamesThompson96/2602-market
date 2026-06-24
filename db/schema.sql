-- TODO
drop table if exists users;
drop table if exists orders;
drop table if exists orders_products;
drop table if exists products;

create table users (
  id serial primary key,
  username text unique not null,
  password text not null
)

create table orders (
  id serial primary key,
  date date not null,
  note text,
  user_id int not null references users(id) on delete cascade
)

create table orders_products (
  order_id int not null,
  product_id int not null,
  quantity int not null,

  indexes {
    (order_id, product_id) primary key,
  }
)

create table products (
  id serial primary key,
  title text not null,
  description text not null,
  price decimal not null,
  products_id int not null references products(id) on delete cascade
)
