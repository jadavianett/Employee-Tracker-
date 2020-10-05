DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB; 
USE employeeDB; 



CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30),
     salary DECIMAL(10,2) NULL,
    --  INT to hold reference to department role belongs to
     department_id INTEGER,
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
    PRIMARY KEY (id)
);
