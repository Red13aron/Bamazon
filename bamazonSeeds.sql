DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Play-Doh Clay 36-Case", "Toys And Games", 24.99, 1245),
 ("Jenga Classic", "Toys And Games", 5.75, 2367),
 ("Lego Harry Potter Kit", "Toys And Games", 32.99, 892),
 ("Fire TV Stick with Alexa", "Electronics", 39.99, 257),
 ("All-New Fire 7 Tablet", "Electronics", 49.99, 512),
 ("Roku Express Media Player", "Electronics", 29.88, 7649),
 ("Wyze Cam 1080p", "Cameras And Photo", 25.98, 4),
 ("Fujifilm Instax Film Value Pack", "Cameras And Photo", 30.90, 10999),
 ("8'' Selfie Ring Light with Tripod", "Camera And Photo", 31.99, 31432),
 ("Legend of Zelda Link's Awakening", "Video Games", 59.99, 6711);

SELECT * FROM products;