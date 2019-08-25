INSERT INTO  customers
    (first_name, last_name, email, phone,current_location, password)
VALUES
    ('Tester', 'Tester', 'test@test.com', '6479999999', '123,123', '123'),
    ('Bobby', 'Lee', 'test2@test.com', '4169999999', '111,111', '123');


INSERT INTO categories
    (name, thumbnail_image, description)
VALUES
    ('asian', 'https://images.pexels.com/photos/2165933/pexels-photo-2165933.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'The best Japanese restaurants in Toronto are where to go for food beyond sushi and ramen and dig into favourites like yakitori and donburi. Each of these spots have their own unique little twists, but there’s one thing you can count on all of them to have: sake.' ),
    ('mexican', 'https://dish-environment-prod-contentbucket-10u8bszryovz3.s3.amazonaws.com/assets/s3fs-public/styles/content_image_medium/public/102108380-Authentic-Mexican-Cuisine-Photo-by-Meredith.jpg?itok=viwyaYS0', 'Authentic Mexican food is vibrant, delicious, fresh and fun. It is also colourful, spicy and uses an amazing array of chillies, both fresh and dried.'),
    ('western', 'http://backoffice.miriapp.com/media/foods/5/20160628105845.jpg', 'In essence, Western cuisine derives its base from French cuisine. Auguste Escoffier’s modernisation of classical French cooking techniques serves as the base of the culinary world today, in particular, his popularisation of the 5 Mother Sauces; sauce béchamel, espagnole, velouté, hollandaise and tomate, are names that every cook and chef should know by heart. In fact, most modern sauces are variations of this fundamental sauce tree.'),
    ('italian', 'https://www.englishclub.com/images/vocabulary/food/italian/italian-food-640.jpg', 'The best Italian restaurants in Toronto are known not only for their food, but their atmosphere as well. From pizza, pasta, antipasti, seafood and good wine, these spots have all the favourites.');


INSERT INTO restaurants
    (name, location, address, phone, email, password, category_id, image_url)
VALUES
    ('Mandarin', '111,111', '123 Main', '6478888888', '123@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Taco Bell', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('McDonalds', '145,145', '123 Lighthouse', '6478988888', 'abc@test.com', '123', '3', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Juicy Dumpling', '111,111', '123 Main', '6478888888', '123@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Aji Sai', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Quiznos', '111,111', '123 Main', '6478888888', '123@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Pizza Hut', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Little Caesers', '111,111', '123 Main', '6478888888', '123@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Figo Toronto', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '4', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Wakame', '111,111', '123 Main', '6478888888', '123@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Spring Sushi', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Dumpling House', '111,111', '123 Main', '6478888888', '123@test.com', '123', '1', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    ('Mucho Burrito', '123,123', '123 Bay', '6474446584', '1234@test.com', '123', '2', 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
;

INSERT INTO orders
    (customer_id, restaurant_id, created_at, pickup_time, order_total )
VALUES
    (1, 1, 1566665736504, 1566665736504, 53),
    (1, 1, 1566665736504, 1566665736504, 53),
    (2, 2, 1566665736504, 1566665736504, 53);

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
    (1, 1, 4)
