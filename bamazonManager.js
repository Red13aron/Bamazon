
//Our Requires from either Node or NPM
const mysql = require("mysql");
const inquirer = require("inquirer");
const AsciiTable = require('ascii-table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazonDB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    manageProducts();
});


function manageProducts() {
    inquirer.prompt(
        {
            name: "options",
            message: "Select a menu option:",
            type: "list",
            choices: [`View Products for Sale`, `View Low Inventory`,
                `Add to Inventory`, `Add New Product`]
        }
    ).then(function (answer) {
        console.log(answer.options);
        if (answer.options === `View Products for Sale`) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                const table = new AsciiTable('Bamazon Products')
                table.setHeading(`Item ID`, `Product Name`, `Price`, `Stock Quantity`);
                for (let i = 0; i < res.length; i++) {
                    let item_id = res[i].item_id;
                    let product_name = res[i].product_name;
                    let price = `$${res[i].price}`;
                    let stock_quantity = res[i].stock_quantity;
                    table.addRow(item_id, product_name, price, stock_quantity);
                }
                console.log(table.toString());
                connection.end();
            });

        }
        else if (answer.options === `View Low Inventory`) {
            connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (err, res) {
                if (err) throw err;
                const table = new AsciiTable('Bamazon Products')
                table.setHeading(`Item ID`, `Product Name`, `Price`, `Stock Quantity`);
                for (let i = 0; i < res.length; i++) {
                    let item_id = res[i].item_id;
                    let product_name = res[i].product_name;
                    let price = `$${res[i].price}`;
                    let stock_quantity = res[i].stock_quantity;
                    table.addRow(item_id, product_name, price, stock_quantity);
                }
                console.log(table.toString());
                connection.end();
            })
        }
        else if (answer.options === `Add to Inventory`) {
            connection.query(`SELECT product_name FROM products`, function (err, res) {
                if (err) throw err;
                let productNames = [];
                for (let i = 0; i < res.length; i++) {
                    productNames.push(res[i].product_name);
                }
                inquirer.prompt([{
                    name: `product`,
                    message: `Which of these products would you like to add more too?`,
                    type: `list`,
                    choices: productNames
                },
                {
                    name: `amount`,
                    message: `How much would you like to add?`,
                    type: `input`
                }]).then(function (answer) {
                    console.log(`Now updating stock quantity...\n`);
                    connection.query(`UPDATE products SET stock_quantity = stock_quantity+${answer.amount}
                    WHERE product_name = '${answer.product}'`, function (err, res) {
                        if (err) throw err;
                        console.log(`You have successfully update ${answer.product}`)
                        connection.end();
                    });
                });
            })
        }
        else if (answer.options === `Add New Product`) {
            inquirer.prompt([{
                name: `product_name`,
                message: `What is this product's name?`,
                type: `input`
            },
            {
                name: `department_name`,
                message: `What department does this product belong to?`,
                type: `input`
            },
            {
                name: `price`,
                message: "How much does this product cost? (Up to 2 before and 10 after decimal place)",
                type: `input`
            },
            {
                name: `stock_quantity`,
                message: `What is the stock of this product? (Default will be 0)`,
                type:`input`
            }]).then(function(answer){
                console.log(`Now entering your new product...\n`);
                 connection.query(`INSERT INTO products(product_name, department_name, price, stock_quantity)
                  VALUES('${answer.product_name}', '${answer.department_name}', '${answer.price}', '${answer.stock_quantity}');`, function(err, res){
                    if(err) throw err;
                    console.log(res);
                    console.log(`You have succefully added the new product ${answer.product_name}`);
                    connection.end();
                  });
            });
        }

    });
}