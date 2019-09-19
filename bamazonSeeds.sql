DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Play-Doh Clay 36-Case", "Toys And Games", 24.99, 1245, 499.80),
 ("Jenga Classic", "Toys And Games", 5.75, 2367, 1150.00),
 ("Lego Harry Potter Kit", "Toys And Games", 32.99, 892, 2276.31),
 ("Fire TV Stick with Alexa", "Electronics", 39.99, 257, 999.75),
 ("All-New Fire 7 Tablet", "Electronics", 49.99, 512, 2499.50),
 ("Roku Express Media Player", "Electronics", 29.88, 7649, 2270.88),
 ("Wyze Cam 1080p", "Cameras And Photo", 25.98, 4, 51.96),
 ("Fujifilm Instax Film Value Pack", "Cameras And Photo", 30.90, 10999, 3399.00),
 ("8'' Selfie Ring Light with Tripod", "Cameras And Photo", 31.99, 31432, 10076.85),
 ("Legend of Zelda Link's Awakening", "Video Games", 59.99, 6711, 35994.00);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs FLOAT NOT NULL,
  PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("Toys And Games", 150000),
("Electronics", 375000),
("Cameras And Photo", 289000),
("Video Games", 20000);

SELECT * FROM products;

