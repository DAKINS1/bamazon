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

connection.connect(function(err) {
  if (err) throw err;

  // console.log("Connected!");

});

function Manager() {
  inquirer.prompt([
  {
    type: "list",
    message: "\nPlease choose from the options below.",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
    name: "startMenu"
  }
  ]).then(function(answer){
    var pauseBreak;

    switch (answer.startMenu) {
      case 'View Products for Sale':
      console.log("Here is the list of products currently for sale.");
      pauseBreak = setTimeout(productsForSale, 1000);
      break;

      case 'View Low Inventory':
      console.log("Here is the list of low inventory.");
      pauseBreak = setTimeout(lowInventory, 1000);
      break;

      case 'Add to Inventory':
      console.log("Thank you. One moment please.");
      pauseBreak = setTimeout(addInventory, 1000);
      break;

      case 'Add New Product':
      console.log("Thank you. One moment please.");
      pauseBreak = setTimeout(newInventory, 1000);
      break;

      case 'Exit':
      console.log("Goodbye!\n");
      connection.end();
      return;
      break;
    }
  });
};

function productsForSale() {
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
    Manager();
  })
}


function lowInventory() {

  queryStr= 'SELECT * FROM products WHERE stock_quantity < 10';

  connection.query(queryStr, function(err, data){
    if (err) throw err;
    if (data.length === 0) {
      console.log('There are no items with low inventory.');
      Manager();
    } else {
      var table = new Table({
        head: ['Item Number', 'Product', 'Department', 'Price', 'In stock Qty']
      });
      for (var i = 0; i < data.length; i++) {
        table.push([data[i].item_id, data[i].product, data[i].department_name, '$' + data[i].price.toFixed(2), data[i].stock_quantity]);
      }
    //log the table to the console
    console.log(table.toString());
    console.log('Here is inventory below 10 units.')
    // productsForSale();
    Manager();
  }
})
}

function validateEntry(value) {
  var integer = Number.isInteger(parseFloat(value));
  //check to see that number is positive
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a valid number.';
  }
}

function addInventory() {
  inquirer.prompt([
  {
    type: 'input',
    name: 'item_id',
    message: 'Please enter the Item ID to add.',
    validate: validateEntry,
    filter: Number
  },
  {
    type: 'input',
    name: 'stock_quantity',
    message: 'How many units would you like to add?',
    validate: validateEntry,
    filter: Number
  }

  ]).then(function(input) {
    var item = input.item_id;
    var addQuantity = input.stock_quantity;

    var queryStr = 'SELECT * FROM products WHERE ?';
    connection.query(queryStr, {item_id: item}, function(err, results) {
      if (err) throw err;
      // console.log(results);


      if (results.length === 0) {
        console.log('Please enter a valid item number.');
        addInventory();

      } else {
        var productData = results[0];
        console.log('Updating Inventory...');

        // Construct the updating query string
        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;
        // console.log('updateQueryStr = ' + updateQueryStr);

        // Update the inventory
        connection.query(updateQueryStr, function(err, data) {
          if (err) throw err;

          console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');


          Manager();
        })
      }
    })
  })
}


function newInventory() {

  inquirer.prompt([
  {
    type: 'input',
    name: 'item_id',
    message: 'Please enter the item id number.',
    validate: validateEntry
  },
  {
    type: 'input',
    name: 'product',
    message: 'Please enter item description.',
  },
  {
    type: 'input',
    name: 'department_name',
    message: 'Please enter department.',
  },
  {
    type: 'input',
    name: 'price',
    message: 'Please enter the unit price.',
  },
  {
    type: 'input',
    name: 'stock_quantity',
    message: 'Please enter quantity.',
    validate: validateEntry
  }
  ]).then(function(input) {

    console.log('Adding New Item:\n item_id = ' + input.item_id + '\n' + 'product = ' + input.product + '\n' +
     'department_name = ' + input.department_name + '\n' +
     'price = ' + input.price + '\n' +
     'stock_quantity = ' + input.stock_quantity);

    // Create the insertion query string
    var queryStr = 'INSERT INTO products SET ?';

    // Add new product to the db
    connection.query(queryStr, input, function (error, results, fields) {
      if (error) throw error;

      console.log('New product has been added to inventory.');

      Manager();
    });
  })
}


module.exports = Manager;