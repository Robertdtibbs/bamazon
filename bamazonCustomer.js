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
   customerOption(); 
});

function customerOption(){
    var query = "Select * from inventory";
    connection.query(query, function(err, res){
        if(err) throw err;
        for(var i = 0; i < res.length; i++){
            console.log(res[i]);
        }
        connection.end();
    })
}