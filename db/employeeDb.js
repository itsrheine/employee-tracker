const { valueToNode } = require('@babel/types');
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

    viewAllEmp() {

        // list as how it would show on the tables using .headers on and .mode columns
        const allEmp = 
            `SELECT employee.id,
                    employee.first_name,
                    employee.last_name,
                    roles.title,
                    department.department_name,
                    roles.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN roles on employee.role_id = roles.id
            LEFT JOIN department on roles.department_id = department.id
            LEFT JOIN employee manager on manager.id = employee.manager_id`;
        return connection.promise().query(allEmp);
    }

    viewAllByDept() {

        // sort per department (add for loop to sort? later)
        const allDept = 
            `SELECT id, 
                    department_name
            FROM department`;
        return connection.promise().query(allDept);
    }

    viewAllByRole() {

        // sort per department (add for loop to sort? later)
        const allRole = 
            `SELECT roles.id, 
                    roles.title, 
                    department.department_name, 
                    roles.salary 
            FROM roles 
            LEFT JOIN department on roles.department_id = department.id`;
        return connection.promise().query(allRole);
    }

    addEmployee(employee) {
        return this.connection.promise().query(
            `INSERT INTO employee SET ?`, employee
        )
    }

    addRole(role) {
        return this.connection.promise().query(
            `INSERT INTO roles SET ?`, role
        )
    }

    removeEmployee(employeeId) {
        return this.connection.promise().query(
            `DELETE FROM employee WHERE id = ?`, employeeId
        )
    }

    removeRole(roleId) {
        return this.connection.promise().query(
            `DELETE FROM roles WHERE id = ?`, roleId
        )
    }

    removeDepartment(deptId) {
        return this.connection.promise().query(
            `DELETE FROM department WHERE id = ?`, deptId
        )
    }

    addDept(department_name) {
        return this.connection.promise().query(
            `INSERT INTO department SET ?`, department_name
        )
    }

    updateEmployee(roleId, employeeId) {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId]
        )
    }
    
    quit() {
        connection.end();
    }
}

module.exports = new Index(connection);