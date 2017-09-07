DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id VARCHAR(10),
    product VARCHAR(100) ,
    department_name VARCHAR(20),
    price DECIMAL(18, 2), 
    stock_quantity TINYINT (10),
    TotalSales VARCHAR(10),
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product, department_name, price, stock_quantity)
VALUES("56745", "20pc. Makeup Brush Set", "beauty", 24.99, 25),
("25637", "Eyebrow Care Set", "beauty", 10.49, 25),
("37987", "Longlasting Matte Lipstick", "beauty", 18.99, 25),
("46593",  "Matte powder blush", "beauty", 7.99, 25),
("82838",  "15 Colour Concealer Palette", "beauty", 14.99, 25),
("27093",  "Voluminous mascara, carbon black", "beauty", 6.99, 25),
("16384", "Precision Liquid Eyeliner, black", "beauty", 4.99, 25),
("75593",  "Eyelash curler with refill pad", "beauty", 7.49, 25),
("66291",  "Ultrafine lip color pencil, plum", "beauty", 6.99, 25),
("90892",  "True Match blendable powder", "beauty", 9.99, 25);


