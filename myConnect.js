
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table2');

const customer = require("./BamazonCustomer");
const manager = require("./BamazonManager");


function StartMenu(){
    inquirer.prompt([
    {
        type: "list",
        message: "\nPlease choose from the options below.",
        choices: ["CUSTOMER", "MANAGER", "EXIT"],
        name: "startMenu"
    }
    ]).then(function(answer) {
        var pauseBreak;

        switch (answer.startMenu) {
            case "CUSTOMER":
            console.log("Thank you. One moment please....");
            pauseBreak = setTimeout(customer, 1000);
            break;

            case "MANAGER":
            console.log("Thank you. One moment please....");
            pauseBreak = setTimeout (manager, 1000);
            break;

            case "EXIT":
            console.log("Thank you. Goodbye!");
            return;
            connection.end();
            break;
        }
    });
};
StartMenu();


