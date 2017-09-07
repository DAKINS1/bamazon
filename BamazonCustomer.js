//todo:  get cart to update total of all purchases.

const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table2');

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
  // Your username
  user: "",
  // Your password
  password: "",
  database: "bamazon_db"
});

//global functions
var ShoppingCart = [];
//to do :  get cart to add up total.

connection.connect(function(err) {
	if (err) throw err;
  // console.log("Connected!");
});

function validUserAnsw(value){
	if (isNaN(value) === false) {
		return true;
	}
	return 'Please enter a valid number.';
}


function BamazonCustomerInv() {
  var table = new Table({
    head: ['Item Number', 'Product', 'Department', 'Price', 'In stock Qty']
  });

  queryStr= 'SELECT * FROM products';

  connection.query(queryStr, function(err, data){
    if (err) throw err;


    for (var i = 0; i < data.length; i++) {
      table.push([data[i].item_id, data[i].product, data[i].department_name, '$' + data[i].price.toFixed(2), data[i].stock_quantity]);
    }
    //log the table to the console
    console.log(table.toString());
    customerView();
  })
}

function customerView() {
	inquirer.prompt([
	{
		name: "item_id",
		type: "input",
		message: "What would you like to purchase today?",
		validate: validUserAnsw,
	},
	{
		name: "quantity",
		type: "input",
		message: "How many units would you like to purchase?",
		validate: validUserAnsw,

	}
	]).then(function(input) {
        // get the information of the chosen item
        var chosenItem = input.item_id;
        var chosenQty = input.quantity;

        var queryStr= 'SELECT * FROM products where ?';

        connection.query(queryStr, [{item_id: chosenItem}], function(err , data) {
        	if (err) throw err;

        	if (data.length === 0) {
        		console.log("Item number is invalid. Please try again.");
        	} else {

        		var productsData = data[0];
        		var total = (productsData.price * chosenQty);


        		if (chosenQty <= productsData.stock_quantity) {
        			console.log("One moment please. Updating cart..");

        			var updateQueryStr = "UPDATE products SET stock_quantity= "
        			+ (productsData.stock_quantity - chosenQty) + " WHERE item_id = " + chosenItem;
                // console.log('updateQueryStr = ' + updateQueryStr);
                console.log("Your order total is $" + total);
                orderMore();

                connection.query(updateQueryStr, function(err, data) {
                	if (err) throw err;
                })
              } else {
               console.log("Your order could not be completed. Quantity request exceeds quantity available.  Please try again.")
               orderMore();
             }
           }
         })
      })
}

function orderMore() {
	inquirer.prompt([
	{
		type: "list",
		message: "Would you like to make additional purchases today?",
		choices: ["Yes", "No"],
		name: "checkout"
	}
	]).then(function(answer) {
		var pauseBreak;
		switch(answer.checkout) {
			case "Yes":
			console.log("Thank you, please continue.");
			pauseBreak = setTimeout(customerView, 1000);
			break;

			case "No":
			console.log("Thank you. Please come again.");
			return;
			connection.end();
		}
	})
}

module.exports = BamazonCustomerInv;

