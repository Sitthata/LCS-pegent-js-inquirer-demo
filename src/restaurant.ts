import data from "./data/menu.json";
import inquirer from "inquirer";

const menuList = data.menu;
let cart = [];

export async function restaurantUi() {
  const choice = ["Order", "View Cart", "View Coupon", "Apply Coupon", "Exit"];
  const mainMenu = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Welcome to our Restaurant. What can we help you?",
      choices: choice,
    },
  ]);

  switch (mainMenu.action) {
    case "Order":
      await order();
      break;
    case "View Cart":
      console.log();
      break;
    case "View Coupon":
      console.log();
      break;
    case "Apply Coupon":
      console.log();
      break;
    case "Exit":
      process.exit(0);
  }
  restaurantUi();
}

const order = async () => {
  const orderList = await inquirer.prompt([
    {
      type: "checkbox",
      name: "order",
      message: "What would you like to order?",
      choices: menuList.map((item) => {
        return {
          name: `${item.name} - $${item.price}`,
          value: item,
        };
      })
    },
  ]);
  
  console.log(orderList.order)
};
