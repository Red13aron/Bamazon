# Bamazon
A node app that runs bamazon for customers, managers, and supervisors

## Overview
This app was created to provide customers of Bamazon with a platform to make purchases, to provide managers with a platform to manage products, and to provide supervisors with a platform to manage departsments and view total profits of each department.

## Organization
This app is borken up into three distinct js files and one sql file:
1. `bamazonCustomer.js` our customer node js file that allows customers to view prducts and make purchases.

2. `bamazonManager.js` our manager node js file that allows managers to view products, view low inventory, add to an item's stock, and add a new item.

3. `bamazonSupervisor.js` our supervisor node js file that allows supervisors to view total sales compared to specific departments, and add new departments.

4. `bamazonSeeds.sql` our sql seed file to initially setup our database for bamazonDB

### How to run
The app may be run by typing either node bamazonCustomer.js, node bamazonManager.js, node bamazonSupervisor.js.  After that follow the example gifs below for instructions about each node js file choices.

## Example Gifs:

-View and Buying Products as a Customer

![Example of the Customer purchasing](https://i.imgur.com/WECn8bY.gif)

-Viewing Products, Viewing Low Inventory, Adding Stock, Adding New Product as a Manager

![Example of the Manager Options](https://i.imgur.com/JIihb2V.gif)

-Viewing Product Sales by Department, Create New Department as a Supervisor

![Example of Supervisor Options](https://i.imgur.com/degXbLi.gif)

## Technologies
bamazon-node-app uses the following technologies:
1. Inquirer, asks the user for input
2. MySQL, makes connections and queries to the database
3. Ascii Table, helps to organize the output,  take that console.table!

## Collaborators

**Shane Nelson!**

**Cooper showed me Ascii Table  was cool would use again**