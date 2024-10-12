#!/usr/bin/env node

import inquirer from "inquirer";

// Define the questions
const questions = [
  {
    type: "list",
    name: "size",
    message: "What size pizza would you like?",
    choices: ["Small", "Medium", "Large", "Extra Large"],
    default: "Medium",
  },
  {
    type: "list",
    name: "crust",
    message: "Choose your crust type:",
    choices: ["Thin Crust", "Thick Crust", "Stuffed Crust", "Gluten-Free"],
    default: "Thin Crust",
  },
  {
    type: "checkbox",
    name: "toppings",
    message: "Select your toppings:",
    choices: [
      { name: "Pepperoni" },
      { name: "Mushrooms" },
      { name: "Onions" },
      { name: "Sausage" },
      { name: "Bacon" },
      { name: "Extra cheese" },
      { name: "Black olives" },
      { name: "Green peppers" },
      { name: "Pineapple" },
      { name: "Spinach" },
    ],
    validate: function (answer) {
      if (answer.length < 1) {
        return "You must choose at least one topping.";
      }
      return true;
    },
  },
  {
    type: "confirm",
    name: "extraCheese",
    message: "Would you like to add extra cheese?",
    default: false,
  },
  {
    type: "input",
    name: "orderName",
    message: "What's the name for the order?",
    validate: function (input) {
      if (input.trim() === "") {
        return "Order name cannot be empty.";
      }
      return true;
    },
  },
];

// Function to calculate price (optional)
const calculatePrice = (answers) => {
  let price = 0;

  // Price based on size
  switch (answers.size) {
    case "Small":
      price += 8;
      break;
    case "Medium":
      price += 10;
      break;
    case "Large":
      price += 12;
      break;
    case "Extra Large":
      price += 14;
      break;
  }

  // Price based on crust
  switch (answers.crust) {
    case "Thin Crust":
      price += 0;
      break;
    case "Thick Crust":
      price += 2;
      break;
    case "Stuffed Crust":
      price += 3;
      break;
    case "Gluten-Free":
      price += 2.5;
      break;
  }

  // Price based on number of toppings
  price += answers.toppings.length * 1.5;

  // Extra cheese
  if (answers.extraCheese) {
    price += 1.5;
  }

  return price.toFixed(2);
};

// Main function to run the order
export const runOrder = async () => {
  try {
    console.log("🍕 Welcome to PizzaOrder CLI! 🍕\n");
    const answers = await inquirer.prompt(questions);

    const totalPrice = calculatePrice(answers);

    console.log("\n--- Order Summary ---");
    console.log(`Order Name: ${answers.orderName}`);
    console.log(`Size: ${answers.size}`);
    console.log(`Crust: ${answers.crust}`);
    console.log(`Toppings: ${answers.toppings.join(", ")}`);
    console.log(`Extra Cheese: ${answers.extraCheese ? "Yes" : "No"}`);
    console.log(`Total Price: $${totalPrice}`);
    console.log("---------------------\n");

    // Confirmation
    const confirmOrder = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Would you like to place this order?",
        default: true,
      },
    ]);

    if (confirmOrder.confirm) {
      console.log(
        `\nThank you, ${answers.orderName}! Your pizza is being prepared.\n`
      );
    } else {
      console.log("\nOrder canceled. Let us know if you need anything else!\n");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
