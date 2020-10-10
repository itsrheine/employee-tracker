const mysql = require('mysql2');

const account = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "24p@ssw0rd!",
    database: "employeeDb"
});

class Index {
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

    quit() {
        account.end();
    }
}

module.exports = new Index(account);