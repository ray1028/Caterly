drop table if exists customers
cascade;
drop table if exists restaurants
cascade;
drop table if exists orders
cascade;
drop table if exists orders_items
cascade;
drop table if exists items
cascade;
drop table if exists ratings
cascade;
drop table if exists categories
cascade;

create table customers
(
  id serial primary key not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  phone varchar(50) not null,
  current_location varchar(255) not null,
  password varchar(255) not null
);

create table categories
(
  id serial primary key not null,
  name varchar(255) not null,
  thumbnail_image varchar(255) not null,
  description text not null
);

create table restaurants
(
  id serial primary key not null,
  name varchar(255) not null,
  location varchar(255),
  address varchar(255) not null,
  phone varchar(50) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  category_id integer references categories(id) on delete cascade,
  image_url varchar(255) not null,
  description text not null
);

create table orders
(
  id serial primary key not null,
  customer_id integer references customers(id) on delete cascade,
  restaurant_id integer references restaurants(id) on delete cascade,
  created_at bigint not null default 0,
  pickup_time bigint not null default 0,
  order_total int not null default 0
);

create table items
(
  id serial primary key not null,
  name varchar(255) not null,
  price integer not null,
  description text not null,
  thumb_nail_url varchar(255) not null,
  restaurant_id integer references restaurants(id) on delete cascade
);

create table orders_items
(
  id serial primary key not null,
  order_id integer references orders(id) on delete cascade,
  item_id integer references items(id) on delete cascade,
  quantity integer not null default 0
);

create table ratings
(
  id serial primary key not null,
  customer_id integer references customers(id) on delete cascade,
  restaurant_id integer references restaurants(id) on delete cascade,
  rating smallint not null default 0
);




