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
  inquirer.prompt([
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
  ]).then(({selection}) => {
      console.log(selection);
      if (selection==="View All Employees") {
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
  }
  );
}
