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

function managerOptions() {
    inquirer.prompt([
        {
            name: "inventory",
            type: "list",
            message: "Choose an Action:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Program"]
        }
    ]).then(function (selection) {
        switch (selection.inventory) {
            case "View Products for Sale":
                inventoryList();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                orderInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit Program":
                connection.end();
                break;
        }
    })
}

function inventoryList() {
    var query = "Select * from inventory";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " | " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Quantity: " + res[i].stock_quantity)
        }
        managerOptions();
    })
}

function lowInventory() {
    var query = "Select * from inventory where stock_quantity <=" + 100;
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " | " + res[i].product_name + " | Quantity: " + res[i].stock_quantity);
        }
        managerOptions();
    })
}

function addProduct() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Name of new product:"
        },
        {
            name: "department",
            type: "list",
            message: "Choose products department:",
            choices: ["technology", "Outdoor", "Sports", "Yard Maintenance"]
        },
        {
            name: "price",
            type: "input",
            message: "Price of item:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "input",
            message: "How much stock:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (insert) {
        connection.query("insert into inventory set ?",
            {
                product_name: insert.item,
                department_name: insert.department,
                price: insert.price,
                stock_quantity: insert.stock
            },
            function (err) {
                if (err) throw err;
                console.log("New product added to inventory.");
                managerOptions();
            });
    });
};
var productArray = []
function orderInventory() {
    var query = "Select * from inventory";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {

            var product = res[i].product_name;

            productArray.push(product);
        };
        inquirer.prompt([
            {
                name: "item",
                type: "list",
                message: "Choose the item you would like to purchase more stock of:",
                choices: productArray,
            },
            {
                name: "stock",
                type: "input",
                message: "Amount of stock to purchase:",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (order) {
            var product = order.item;
            var stock = order.stock;
            updateStock(product, stock)
        })
    });
}

function updateStock(product, stock) {

    connection.query("select * from inventory where product_name =" + product ,
    function (err, res) {
        if (err) throw err;
        itemID = res[0].item_id;
        console.log(itemID)
        connection.query("update inventory set stock_quantity = stock_quantity + " + stock + "where item_id = " + itemID,
        function(err){
            if(err) throw err;
            console.log("Inventory updated.");
            managerOptions();
        })
        
    })
}