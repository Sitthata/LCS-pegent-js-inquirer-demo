import inquirer from "inquirer";

// Define the Product interface
interface Product {
  id: number;
  name: string;
}

// Initialize the products array
let products: Product[] = [];

// Entry point for the Product UI
export async function productUi() {
  const choices = [
    "Create Product",
    "View Products",
    "Update Product",
    "Delete Product",
    "Exit",
  ];

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: choices,
    },
  ]);

  switch (answer.action) {
    case "Create Product":
      await createProduct();
      break;
    case "View Products":
      await viewProducts();
      break;
    case "Update Product":
      await updateProduct();
      break;
    case "Delete Product":
      await deleteProduct();
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit();
    default:
      console.log("Invalid option selected.");
  }

  // Loop back to the main menu
  await productUi();
}

// Function to create a new product
const createProduct = async () => {
  const newProduct = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter Product Name:",
      validate: (input: string) => {
        if (input.trim() === "") {
          return "Product name cannot be empty.";
        }
        return true;
      },
    },
  ]);

  const id = generateUniqueId();

  products.push({
    id: id,
    name: newProduct.name.trim(),
  });

  console.log(`\nProduct "${newProduct.name}" added successfully with ID ${id}!\n`);
};

// Function to view all products
const viewProducts = async () => {
  console.log("\n=== Product List ===");
  if (products.length === 0) {
    console.log("No products available.\n");
    return;
  }
  console.table(products);
};

// Function to update an existing product
const updateProduct = async () => {
  if (products.length === 0) {
    console.log("\nNo products available to update.\n");
    return;
  }

  const { selectedId } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedId",
      message: "Select a product to update:",
      choices: products.map((product) => ({
        name: `${product.name} (ID: ${product.id})`,
        value: product.id,
      })),
    },
  ]);

  const productToUpdate = products.find((product) => product.id === selectedId);

  if (!productToUpdate) {
    console.log("\nProduct not found.\n");
    return;
  }

  const { newName } = await inquirer.prompt([
    {
      type: "input",
      name: "newName",
      message: `Enter new name for "${productToUpdate.name}":`,
      validate: (input: string) => {
        if (input.trim() === "") {
          return "Product name cannot be empty.";
        }
        return true;
      },
      default: productToUpdate.name,
    },
  ]);

  productToUpdate.name = newName.trim();

  console.log(`\nProduct ID ${productToUpdate.id} has been updated to "${productToUpdate.name}".\n`);
};

// Function to delete an existing product
const deleteProduct = async () => {
  if (products.length === 0) {
    console.log("\nNo products available to delete.\n");
    return;
  }

  const { selectedId } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedId",
      message: "Select a product to delete:",
      choices: products.map((product) => ({
        name: `${product.name} (ID: ${product.id})`,
        value: product.id,
      })),
    },
  ]);

  const productToDelete = products.find((product) => product.id === selectedId);

  if (!productToDelete) {
    console.log("\nProduct not found.\n");
    return;
  }

  const { confirmDelete } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmDelete",
      message: `Are you sure you want to delete "${productToDelete.name}"?`,
      default: false,
    },
  ]);

  if (confirmDelete) {
    products = products.filter((product) => product.id !== selectedId);
    console.log(`\nProduct "${productToDelete.name}" has been deleted.\n`);
  } else {
    console.log("\nDeletion cancelled.\n");
  }
};

// Utility function to generate a unique ID
const generateUniqueId = (): number => {
  if (products.length === 0) return 1;
  const ids = products.map((product) => product.id);
  return Math.max(...ids) + 1;
};

// Start the Product UI
productUi();
