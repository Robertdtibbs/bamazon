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
    customerOptions();
});

function customerOptions() {

    inquirer.prompt([
        {
            name: "inventory",
            type: "list",
            message: "Choose an Action:",
            choices: ["View items for sale", "Exit Store"]
        }
    ]).then(function (selection) {
        switch (selection.inventory) {
            case "View items for sale":
                purchase();
                break;
            case "Exit Store":
                connection.end();
                break;
        }
    })
}

function purchase() {
    var query = "Select * from inventory";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " | " + res[i].product_name + " | Price: " + res[i].price)
        }
        inquirer.prompt([
            {
                name: "choice",
                type: "input",
                message: "Enter the Item number you would like to purhcase:",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "What quantity would you like to purchase:",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (purchase) {

            var quantity = purchase.quantity;
            var itemID = purchase.choice;
            submitOrder(itemID, quantity);

        })
    })
}

function submitOrder(itemID, quantity) {
    connection.query("select * from inventory where item_id = " + itemID, function (err, res) {
        if (err) throw err;
        if (quantity <= res[0].stock_quantity) {
            var cartTotal = res[0].price * quantity;
            console.log("Request item is in stock!")
            console.log("Your total is " + cartTotal);
            console.log("Have a great day and come again!")
            connection.query("Update inventory set stock_quantity = stock_quanity - " + quantity + " where item_id = " + itemID);
        }
        else {
            console.log("I'm sorry we do not have enough stock to fullfill your order.")
        }
        customerOptions();
    })
}