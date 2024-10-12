import inquirer from "inquirer";

let products = [];

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
      await viewProduct();
      break;
    case "Exit":
      process.exit();
    default:
      console.log(answer.action);
  }

  productUi();
}

const createProduct = async () => {
  const newProduct = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter Product name: ",
    },
  ]);

  products.push({
    id: Math.floor(Math.random() * 100),
    name: newProduct.name,
  });

  console.log("Product added successfully!");
};

const viewProduct = async () => {
  console.log("Product List");
  console.table(products);
};

productUi()