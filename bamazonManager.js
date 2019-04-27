var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Durham0422!",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
   managerOptions();
});

function managerOptions(){
    inquirer.prompt([
        {
            name: "inventory",
            type: "list",
            message: "Choose an Action:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Program"]
        }
    ]).then(function(selection){
        switch(answer.inventory){
            case "View Products for Sale":
                break;
            case "View Low Inventory":
                break;
            case "Add to Inventory":
                break;
            case "Add New Product":
                break;
            case "Exit Program":
                connection.end();
                break;
        }
    })
}