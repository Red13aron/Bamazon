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
    superviseProducts();
});

function superviseProducts() {
    inquirer.prompt({
        name: `options`,
        message: `Which of these options would you like:`,
        type: `list`,
        choices: [`View Product Sales by Department`, `Create New Department`]
    }).then(function (answer) {
        console.log(answer.options);
        if (answer.options === `View Product Sales by Department`) {
            connection.query(`SELECT department_id, departments.department_name, over_head_costs, product_sales FROM departments
             INNER JOIN products ON departments.department_name = products.department_name`, function (err, res) {
                if (err) throw err;
                const uniqueIDS = [];
                const uniqueTotals = [];
                for (let i = 0; i < res.length; i++) {
                    if (!uniqueIDS.includes(res[i].department_id)) {
                        uniqueIDS.push(res[i].department_id);
                    }
                }

                for (let i = 0; i < uniqueIDS.length; i++) {
                    uniqueTotals[i] = 0;
                }
                for (let i = 0; i < res.length; i++) {
                    uniqueTotals[uniqueIDS[res[i].department_id - 1] - 1] += res[i].product_sales;
                }

                for (let i = 0; i < uniqueTotals.length; i++) {
                    uniqueTotals[i] = Math.round(uniqueTotals[i] * 100) / 100;
                }


                const table = new AsciiTable('Bamazon Products')
                table.setHeading(`Department ID`, `Department Name`, `Over Head Costs`, `Product Sales`, `Total Profit`);
                for (let i = 0; i < res.length; i++) {
                    let department_id = res[i].department_id;
                    let department_name = res[i].department_name;
                    let over_head_costs = `$${res[i].over_head_costs}`;
                    let product_sales = `$${res[i].product_sales}`;
                    let total_profit = 0;
                    for (let g = 0; g < uniqueTotals.length; g++) {
                        if (department_id - 1 === g) {
                            total_profit = uniqueTotals[g] - res[i].over_head_costs;
                        }
                    }
                    table.addRow(department_id, department_name, over_head_costs, product_sales, total_profit);
                }
                console.log(table.toString());
                
                connection.end();
            })
        }
        else if (answer.options === `Create New Department`) {
            inquirer.prompt([{
                name: `department_name`,
                message: `What is the name of this department?`,
                type: `input`
            },
            {
                name: `over_head_costs`,
                message: `What are the over head costs?`,
                type: `input`
            }]).then(function (answer) {
                console.log(`Adding department...\n`)
                connection.query(`INSERT INTO departments(department_name, over_head_costs)
                 VALUES('${answer.department_name}','${answer.over_head_costs}')`, function (err, res) {
                    if (err) throw err;
                    console.log(`Successfully added new department ${answer.department_name}`);
                    connection.end();
                })
            })

        }
    })
}