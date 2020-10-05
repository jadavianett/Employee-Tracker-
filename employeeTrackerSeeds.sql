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
("Research and Devlopment"),
("Human Resources"),
("Engineering");

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30),
     salary DECIMAL(10,2),
     department_id INTEGER,
     FOREIGN KEY (department_id) REFERENCES department(id)
     PRIMARY KEY (id)
); 

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
