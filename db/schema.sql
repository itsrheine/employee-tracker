DROP TABLE IF EXISTS employee;

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_departments FOREIGN KEY (role_id) REFERENCES (role_id),
    CONSTRAINT fk_managers FOREIGN KEY (manager_id) REFERENCES (id)
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);