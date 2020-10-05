const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "jada1998",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
  connection.end;
});

function init() {
  console.log("Welcome to the Employee Manager!");
  inquirer
    .prompt([
      {
        name: "selection",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
        ],
      },
    ])
    .then(({ selection }) => {
      console.log(selection);
      if (selection === "View All Employees") {
        viewAllEmployees();
      } else if (selection === "View All Employees by Department") {
        viewEmployeesByDepartment();
      } else if (selection === "View All Employees by Manager") {
        viewEmployeesByManager();
      } else if (selection === "Add Employee") {
        addEmployee();
      } else if (selection === "Remove Employee") {
        removeEmployee();
      } else if (selection === "Update Employee Role") {
        updateEmployeeRole();
      } else if (selection === "Update Employee Manager") {
        updateEmployeeManager();
      }
    });
}

function addEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      message: "What is the employee's first name?",
      type: "input",
    },
    {
      name: "lastName",
      message: "What is the employee's last name?",
      type: "input",
    },
    {
      name: "role",
      message: "What is the employee's role?",
      type: "list",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
      ],
    },
    {
      name: "employeeManager",
      message: "Who is the employee's manager?",
      type: "list",
      choices: [
        "None",
        "John Doe",
        "Mike Chan",
        "Ashley Rodriguez",
        "Kevin Tupik",
        "Malia Brown",
        "Sarah Lourd",
      ],
    },
  ]);
}
