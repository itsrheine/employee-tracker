const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "24p@ssw0rd!",
    database: "employee"
});

connection.connect(function (err) {
    if (err) throw err;
  });

class Index {
    constructor(connection){
        this.connection = connection;
    }

    getAllEmp() {

        // list as how it would show on the tables using .headers on and .mode columns
        const allEmp = 
            `SELECT employee.id,
                    employee.first_name,
                    employee.last_name,
                    roles.title,
                    department.name,
                    roles.salary
            FROM employee
            LEFT JOIN roles on employee.role_id = roles.id
            LEFT JOIN department on department.name = department.id`
                    // manager use names from employees
        return connection.promise().query(allEmp);
    }

    quit() {
        connection.end();
    }
}

module.exports = new Index(connection);