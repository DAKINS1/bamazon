# bamazon
BAMAZON
Simple command line based storefront with Customer and Manager options using:
Node.js
npm Inquirer package
npm mysql package
npm Cli-table2 package
mySQL Database


MySQL Database Setup
A MySQL database is needed for this application. 
MySQL Workbench was used to create the bamazon.sql database file (included).

Clone or Download repository onto your local computer.
CD with your terminal into the folder.
In terminal type in: Node myConnect.js
User is prompted to choose CUSTOMER, MANAGER, or EXIT.

CUSTOMER VIEW:
The user is shown the current available inventory: 
item ID number, descriptions, department, price, and quantity available for purchase.
The user will be prompted for item id number of the item they would like to purchase and quantity desired.
The user is then prompted if they would like to continue making purchases.

[![Customer.gif](https://s26.postimg.org/7kcpf3mrt/Customer.gif)](https://postimg.org/image/su0bpy32d/)


MANAGER VIEW:
The user has a list of options to choose from.

View Products for Sale allows the user to view the current inventory of items for sale.

[![Manager_View_Products.gif](https://s26.postimg.org/l53he82kp/Manager_View_Products.gif)](https://postimg.org/image/9sqvwftvp/)

View Low Inventory option shows the user items that have fewer than 10 units available.
Add to Inventory option allows the user to add to inventory by item id number and entering qty.

[![Manager_Low_Add_Products.gif](https://s26.postimg.org/ssqdwj18p/Manager_Low_Add_Products.gif)](https://postimg.org/image/jky5ftu6d/)

Add New Product option allows the user to enter a new item which is then added into the inventory database.

[![Manager_New_item.gif](https://s26.postimg.org/fsen03eo9/Manager_New_item.gif)](https://postimg.org/image/atr4lkav9/)






