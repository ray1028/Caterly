INSERT INTO  customers
    (first_name, last_name, email, phone,current_location, password)
VALUES
    ('Tester', 'Tester', 'test@test.com', '6479999999', '123,123', '123'),
    ('Bobby', 'Lee', 'test2@test.com', '4169999999', '111,111', '123');


INSERT INTO categories
    (name, thumbnail_image, description)
VALUES
    ('asian', 'http://blogs.discovermagazine.com/crux/files/2013/08/bowl-of-rice.jpg', 'The best Japanese restaurants in Toronto are where to go for food beyond sushi and ramen and dig into favourites like yakitori and donburi. Each of these spots have their own unique little twists, but there’s one thing you can count on all of them to have: sake.' ),
    ('mexican', 'https://www.goodlifeeats.com/wp-content/uploads/2012/11/FallMexicanRiceBowl2-f.jpg', 'Authentic Mexican food is vibrant, delicious, fresh and fun. It is also colourful, spicy and uses an amazing array of chillies, both fresh and dried.'),
    ('western', 'http://diner22.com/wp-content/uploads/2017/10/breakfast.jpg', 'With roadside diners, vintage drive-ins and out-of-the-way "dives" enjoying a resurgence of hipness among foodies, host Guy Fieri travels across America in search of some of the best "greasy spoon" eateries.'),
    ('italian', 'https://assets3.thrillist.com/v1/image/1901599/size/tmg-article_default_mobile.jpg', 'The best Italian restaurants in Toronto are known not only for their food, but their atmosphere as well. From pizza, pasta, antipasti, seafood and good wine, these spots have all the favourites.');


INSERT INTO restaurants
    (name, location, address, phone, email, password, category_id, image_url)
VALUES
    ('Aji Sai', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Juicy Dumpling', '111,111', '123 Main', '6478888888', '123@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Spring Sushi', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Dumpling House', '111,111', '123 Main', '6478888888', '123@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Wakame', '111,111', '123 Main', '6478888888', '123@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
        ('Mucho Burrito', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Big Fat Burrito', '111,111', '123 Main', '6478888888', '123@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
  ('Chipotle', '111,111', '123 Main', '6478888888', '123@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Taco Bell', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('McDonalds', '145,145', '123 Lighthouse', '6478988888', 'abc@test.com', '123', '3', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Quiznos', '111,111', '123 Main', '6478888888', '123@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Pizza Hut', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Little Caesers', '111,111', '123 Main', '6478888888', '123@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Figo Toronto', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
;

INSERT INTO orders
    (customer_id, restaurant_id, created_at, pickup_time, order_total )
VALUES
    (1, 1, 1566665736504, 0 , 53),
    (2, 1, 1566669736504, 1566665936504, 54),
    (2, 1, 1566669756504, 1566665936504, 54),
    (1, 1, 1566669666504, 1566665936504, 54),
    (2, 2, 1566665556504, 1566665736504, 53);

INSERT INTO items
    (name, price, description, thumb_nail_url, restaurant_id )
VALUES
    ('friend chicken', 399, 'yummy chicken', 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 1),
    ('Dumplings', 399, 'Nice dumpliings', 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 1),
    ('Sushi', 399, 'Okay sushi', 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 1);
INSERT INTO orders_items
    (order_id, item_id, quantity)
VALUES
    (1, 1, 3),
    (1, 2, 1);
INSERT INTO ratings
    (customer_id, restaurant_id, rating)
VALUES
    (1, 1, 4),
    (2, 1, 5),
    (2, 2, 3),
    (1, 2, 1);
