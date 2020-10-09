DROP TABLE IF EXISTS employee;

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_department FOREIGN KEY (role_id) REFERENCES roles(id),
  manager_id INT UNSIGNED
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);