DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB; 
USE employeeDB; 



CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"),
("Marketing"),
("Finance")
("Research and Devlopment"),
("Human Resources"),
("Legal"),
("Engineering");

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30),
     salary DECIMAL(10,2),
     department_id INTEGER,
     FOREIGN KEY (department_id) REFERENCES department(id)
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
    -- INT to hold reference to role employee has
    role_id INT ,
    -- INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
    manager_id INT, 
    is_manager BOOLEAN, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
);
