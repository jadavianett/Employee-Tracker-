DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB; 
USE employeeDB; 



CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (department_name)
VALUES ("Sales"),
("Marketing"),
("Finance"),
("Research and Devlopment"),
("Human Resources"),
("Legal"),
("Engineering");


CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30),
     salary DECIMAL(10,2) NULL,
     department_id INTEGER,
     FOREIGN KEY (department_id) REFERENCES department(id),
     PRIMARY KEY (id)
); 
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 7),
("Software Engineer", 120000, 7),
("R&D Team Lead", 100000, 4),
("HR Director", 90000, 5),
("Account Manager", 150000, 3),
("Lawyer", 190000, 6),
("Accountant", 120000, 3),
("Legal Team Lead", 250000, 6),
("Marketing Consultant", 80000, 2),
("Marketing Analyst", 125000, 2);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT ,
    manager VARCHAR (30),
    FOREIGN KEY (role_id) REFERENCES role(id),
    -- FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES ("Jim", "Halpert", 1, "John Doe"),
("Dwight", "Schrute", 2, "Mike Chan"),
("Creed", "Bratton", 5, null),
("Stanley", "Hudson", 7, "Kevin Tupik"), 
("Meredith", "Palmer", 2, "Malia Brown"),
("Toby", "Flenderson", 4, "Ashley Rodriguez"),
("Karen", "Filipelli", 8, "Sarah Lourd"),
("Gabe", "Lewis", 12, "John Doe"),
("Robert", "California", 11, null),
("Oscar", "Nunez", 3, null);




SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager FROM role
INNER JOIN employee ON employee.role_id = role.id 
INNER JOIN department ON role.department_id = department.id;