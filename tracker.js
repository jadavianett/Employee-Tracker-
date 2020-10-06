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
  // console.log("Welcome to the Employee Manager!");
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
          "View All Roles",
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
      } else if (selection === "View All Roles") {
        viewAllRoles();
      }
      // else if (selection === "View All Employees by Manager") {
      //   viewEmployeesByManager();
      // }
      else if (selection === "Add Employee") {
        addEmployee();
      }
      // else if (selection === "Remove Employee") {
      //   removeEmployee();
      // }
      else if (selection === "Update Employee Role") {
        updateEmployeeRole();
      }
      // else if (selection === "Update Employee Manager") {
      //   updateEmployeeManager();
      // }
    });
}

function viewAllEmployees() {
  connection.query(
    `SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager FROM role
  INNER JOIN employee ON employee.role_id = role.id
  INNER JOIN department ON role.department_id = department.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function viewAllRoles() {
  connection.query(`SELECT role.title, role.salary from role`, function (
    err,
    res
  ) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function addEmployee() {
  let roleArray= [];
  connection.query("SELECT title, id FROM role", (err, res) => {
    if (err) throw err;
    if (res.length > 0) {
      for (let i=0; i<res.length;i++) {
        const roleObject = {
          name: res[i].title,
          value: res[i].id,
        };
        roleArray.push(roleObject);
      }
    }
  });
  inquirer
    .prompt([
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
        choices: roleArray,
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
    ])
    .then(({ firstName, lastName, role, employeeManager }) => {
      console.log(`${firstName} ${lastName} was added to the directory!`);
      //add the employee to the array
      connection.query("INSERT INTO employee SET ?",
      {
        first_name: firstName,
        last_name: lastName,
        role_id: role,
        manager: employeeManager,
      })

      init();
      
    });
    
}

function updateEmployeeRole() {
  connection.query("SELECT first_name, id FROM employee", function (err, res) {
    if (err) throw err;
    const employeeArray = [];
    // console.table(res);
    if (res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        // console.log(res[i]);
        const employeeObject = {
          name: res[i].first_name,
          value: res[i].id,
        };
        employeeArray.push(employeeObject);
      }
    }
    inquirer
      .prompt([
        {
          name: "employeeChoice",
          message: "Choose the employee who you would like to update.",
          type: "list",
          choices: employeeArray,
        },
      ])
      .then((response) => {
        console.log(response);
        inquirer.prompt([
          { 
            name: "newRole",
            message: "What would you like to change their role to?",
            type: "list",
            choices: [
              "Sales Lead",
              "Salesperson",
              "Lead Engineer",
              "Software Engineer",
              "R&D Team Lead",
              "HR Director",
              "Account Manager",
              "Lawyer",
              "Accountant",
              "Legal Team Lead",
              "Marketing Consultant",
              "Marketing Analyst",
            ],
          }
        ]).then((role) => {
          console.log(role);
          // change the employee role; 
        })
      });
  });
}
