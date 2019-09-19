//cfonts, colors, inquirer

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
    purchaseProducts();
});


//Main application
function purchaseProducts() {
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
                connection.query(`SELECT stock_quantity, price FROM products WHERE item_id = '${answer.ID}'`,
                    function (err, res) {
                        if (err) throw err;
                        let stock = res[0].stock_quantity;
                        if(stock >= answer.Units){
                            console.log(`Now printing your cost...\n`);
                            let newStock = stock - answer.Units;
                            let custCost = answer.Units * res[0].price;
                            connection.query(`UPDATE products SET stock_quantity = ${newStock}, product_sales = product_sales + ${custCost} WHERE item_id = ${answer.ID}`,
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(`Your total price is: ${custCost}`);
                                }
                            );
                                
                        }
                        else if(stock < answer.Units){
                            console.log(`Insufficient quantity!`);
                        }
                        connection.end();
                    })
            });
    });
}

