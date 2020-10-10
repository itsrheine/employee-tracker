const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "24p@ssw0rd!",
    database: "employees"
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
            `SELECT employees.id,
                    employees.first_name,
                    employees.last_name,
                    roles.title,
                    departments.dept_name,
                    roles.salary`
                    // manager use names from employees
        return connection.promise().query(allEmp);
    }

    quit() {
        connection.end();
    }
}

module.exports = new Index(connection);