
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
            });

        }
        else if(answer.options === `View Low Inventory`){
            connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function(err, res){
                if(err) throw err;
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
            })
        }
        connection.end();
    });
}