//cfonts, colors, inquirer

const mysql = require("mysql");
const inquirer = require("inquirer");
const AsciiTable = require('ascii-table')

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
    readProducts();
});

function createProduct() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            flavor: "Rocky Road",
            price: 3.0,
            quantity: 50
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            updateProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function updateProduct() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: 100
            },
            {
                flavor: "Rocky Road"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function deleteProduct() {
    console.log("Deleting all strawberry icecream...\n");
    connection.query(
        "DELETE FROM products WHERE ?",
        {
            flavor: "strawberry"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");
            // Call readProducts AFTER the DELETE completes
            readProducts();
        }
    );
}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // console.log(res);
        const table = new AsciiTable('Bamazon Products')
        table.setHeading(`Item ID`, `Product Name`, `Price`);
        for (let i = 0; i < res.length; i++) {
            let item_id = res[i].item_id;
            let product_name = res[i].product_name;
            let price = `$${res[i].price}`;
            table.addRow(item_id, product_name, price);
        }
        console.log(table.toString());
        inquirer
            .prompt([{
                name: "ID",
                type: "input",
                message: "What product ID are you interested in?"
            },
                {
                    name: "Units",
                    type: "input",
                    message: "How many of this product would you like to purchase?"
                }])
            .then(function (answer) {
                console.log("Checking Stock...\n");
            });
        connection.end();
    });
}