#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

// Function to perform operations
const performOperation = (operation, num1, num2) => {
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    console.error("Error: Both operands must be valid numbers.");
    process.exit(1);
  }

  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) {
        console.error("Error: Division by zero is not allowed.");
        process.exit(1);
      }
      return a / b;
    default:
      console.error("Error: Unknown operation.");
      process.exit(1);
  }
};

// Configure the main program
program
  .name("simple-calculator")
  .description("A simple calculator CLI application")
  .version("1.0.0");

// Add command
program
  .command("add <num1> <num2>")
  .description("Add two numbers")
  .action((num1, num2) => {
    const result = performOperation("add", num1, num2);
    console.log(`${num1} + ${num2} = ${result}`);
  });

// Subtract command
program
  .command("subtract <num1> <num2>")
  .description("Subtract the second number from the first")
  .action((num1, num2) => {
    const result = performOperation("subtract", num1, num2);
    console.log(`${num1} - ${num2} = ${result}`);
  });

// Multiply command
program
  .command("multiply <num1> <num2>")
  .description("Multiply two numbers")
  .action((num1, num2) => {
    const result = performOperation("multiply", num1, num2);
    console.log(`${num1} * ${num2} = ${result}`);
  });

// Divide command
program
  .command("divide <num1> <num2>")
  .description("Divide the first number by the second")
  .action((num1, num2) => {
    const result = performOperation("divide", num1, num2);
    console.log(`${num1} / ${num2} = ${result}`);
  });

// Parse the command-line arguments
program.parse(process.argv);

// If no arguments are provided, display help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
