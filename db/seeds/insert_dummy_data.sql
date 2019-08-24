INSERT INTO  customers
    (id,first_name, last_name, email, phone,current_location, password)
VALUES
    (1, 'Tester', 'Tester', 'test@test.com', '6479999999', '123,123', '123'),
    (2, 'Bobby', 'Lee', 'test2@test.com', '4169999999', '111,111', '123');


INSERT INTO categories
    (id,name, thumbnail_image)
VALUES
    (1, 'asian', 'https://images.pexels.com/photos/2165933/pexels-photo-2165933.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    (2, 'mexican', 'https://images.pexels.com/photos/2165933/pexels-photo-2165933.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    (3, 'western', 'https://images.pexels.com/photos/2165933/pexels-photo-2165933.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');


INSERT INTO restaurants
    (id,name, location, address, phone, email, password, category_id, image_url)
VALUES
    (1, 'Mandarin', '111,111', '123 Main', '6478888888', '123@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    (2, 'Taco Bell', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    (3, 'McDonalds', '145,145', '123 Lighthouse', '6478988888', 'abc@test.com', '123', '3', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')

;

INSERT INTO orders
    (id, customer_id, restaurant_id, created_at, pickup_time, order_total )
VALUES
    (1 , 1, 1, 1566665736504, 1566665736504, 53),
    (2 , 1, 1, 1566665736504, 1566665736504, 53),
    (3 , 2, 2, 1566665736504, 1566665736504, 53);

INSERT INTO items
    (id, name, price, description, thumb_nail_url, restaurant_id )
VALUES
    (1, 'friend chicken', 399, 'yummy chicken', 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 1),
    (2, 'Dumplings', 399, 'Nice dumpliings', 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 1),
    (3, 'Sushi', 399, 'Okay sushi', 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 1);
INSERT INTO orders_items
    (id, order_id, item_id, quantity)
VALUES
    (1, 1, 1, 3),
    (2, 1, 2, 1);
INSERT INTO ratings
    (id, customer_id, restaurant_id, rating)
VALUES
    (1, 1, 1, 4)
