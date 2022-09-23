const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");
let { findAll, addRow, updateRow } = require("../lib/queries");

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Please select one of the following options",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
        default: 2,
      },
    ])
    .then((answers) => {
      verifyAnswer(answers.option);
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong", error);
      }
    });
}

async function addEntry(tableName) {
  let question = {
    department: [
      {
        type: "input",
        name: "name",
        message: "Please provide a name of the department",
      },
    ],
    role: [
      {
        type: "list",
        name: "department_id",
        message: "Please select the department",
        choices: (await findAll("department")).map((e) => ({
          name: e.name,
          value: e.id,
        })),
      },
      {
        type: "input",
        name: "title",
        message: "Please provide a name of the role",
      },
      {
        type: "number",
        name: "salary",
        message: "Please specify the salary for this role",
      },
    ],
    employee: [
      {
        type: "input",
        name: "first_name",
        message: "Please provide the first name of the employee",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please provide the last name of the employee",
      },
      {
        type: "list",
        name: "role_id",
        message: "Please select the role",
        choices: (await findAll("role")).map((e) => ({
          name: e.title,
          value: e.id,
        })),
      },
      {
        type: "list",
        name: "manager_id",
        message: "Please select the manager of the employee",
        choices: (await findAll("employee")).map((e) => ({
          name: `${e.first_name} ${e.last_name}`,
          value: e.id,
        })),
      },
    ],
  };

  inquirer
    .prompt(question[tableName])
    .then((answers) => {
      addRow(tableName, answers)
      .then(()=>{
        console.log("New Entry added in the database");
        mainMenu();
    });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong", error);
      }
    });
}

function viewTable(results) {
  let data = cTable.getTable(results);
  console.log("\n", chalk.blue(data)); // results contains rows returned by server
}

async function updateEntry(tableName, entry) {

  let ques = [
  {
    type: "list",
    name: "first_name",
    message: "Please select the employee for which the role need to change",
    choices: (await findAll("employee")).map((e) => ({
      name: `${e.first_name} ${e.last_name}`,
      value: e.id,
    })),
  },
  {
    type: "list",
    name: "role",
    message: "Please select the role you would like to assign the employee",
    choices: (await findAll("role")).map((e) => ({
      name: e.title,
      value: e.id,
    })),
  }];


  inquirer
    .prompt(ques)
    .then((answers) => {
      updateRow(tableName, answers)
      .then(()=>{
        console.log("Role Update Successful");
        mainMenu();
    });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong", error);
      }
    });



  
}




async function verifyAnswer(answer) {
  switch (answer) {
    case "view all departments":
      viewTable(await findAll("department"));
      mainMenu();
      break;
    case "view all roles":
      viewTable(await findAll("role"));
      mainMenu();
      break;
    case "view all employees":
      viewTable(await findAll("employee"));
      mainMenu();
      break;
    case "add a department":
      addEntry("department");
      break;
    case "add a role":
      addEntry("role");
      break;
    case "add an employee":
      addEntry("employee");
      break;
    case "update an employee role":
      updateEntry("employee","role");
      break;
    default:
      console.log("error");
      break;
  }
}

module.exports = {
  mainMenu,
};
