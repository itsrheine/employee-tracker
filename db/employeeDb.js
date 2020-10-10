const mysql = require('mysql');

const account = account.createConnection({
    host: "localhost",
    user: "root",
    password: "24p@ssw0rd!",
    database: "employeeDb"
});

class Employee {
    constructor(account){
        this.account = account;
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
        return account.promise().query(allEmp);
    }
}

module.exports = db;