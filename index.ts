#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

async function welcome() {
  let RainbowMsg = chalkAnimation.rainbow(
    "Welcome to the Cli simple calculator! "
  );
  await wait();
  RainbowMsg.stop();
  console.log(
    chalk.bgBlue("lets start...\n") +
      `_____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
    `
  );
}
console.clear();
await welcome();

async function askQuestions() {
  await inquirer
    .prompt([
      {
        name: "operation",
        type: "list",
        message: chalk.bgGreenBright(
          "Select the operation you want to perform."
        ),
        choices: [
          "Addition +",
          "Subtraction -",
          "Multiplication *",
          "Division /",
        ],
      },
      {
        name: "num1",
        type: "number",
        message: chalk.bgGreenBright("Enter number 1"),
      },
      {
        name: "num2",
        type: "number",
        message: chalk.bgGreenBright("Enter number 2"),
      },
    ])
    .then((answers) => {
      if (isNaN(answers.num1) || isNaN(answers.num2))
        throw new Error("Invalid Input");

      console.log("  " + chalk.bgBlue("Answer: "));
      switch (answers.operation) {
        case "Addition +": {
          console.log(
            `  ` +
              chalk.blueBright(
                `${answers.num1} + ${answers.num2} = ${
                  answers.num1 + answers.num2
                }`
              )
          );
          break;
        }
        case "Subtraction -": {
          console.log(
            `  ` +
              chalk.blueBright(
                `${answers.num1} - ${answers.num2} = ${
                  answers.num1 - answers.num2
                }`
              )
          );
          break;
        }
        case "Multiplication *": {
          console.log(
            `  ` +
              chalk.blueBright(
                `${answers.num1} x ${answers.num2} = ${
                  answers.num1 * answers.num2
                }`
              )
          );
          break;
        }
        case "Division /": {
          console.log(
            `  ` +
              chalk.blueBright(
                `${answers.num1} / ${answers.num2} = ${
                  answers.num1 / answers.num2
                }`
              )
          );
          break;
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function restart() {
  do {
    await askQuestions();
    var again = await inquirer.prompt({
      type: "input",
      name: "restart",
      message: "Do you want to continue? (y/n)",
    });
  } while (again.restart === "y" || again.restart === "Y");
}
restart();
