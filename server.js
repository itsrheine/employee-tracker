const { resolveSrv } = require('dns');
const inquirer = require('inquirer');
const { title } = require('process');
const { viewAllEmp } = require('./db/employeeDb');
const db = require('./db/employeeDb');

const trackerTitle = () => {

    console.log(
        `
        +------------------+
        | EMPLOYEE TRACKER |
        +------------------+
        `
    )
};

// Main index node directory
function employeeTracker() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a role',
                'Add a department',
                'Update employee role',
            ],
        }
    ]).then(value => {
        switch (value.index) {

            case 'View all employees':
                db.viewAllEmp()
                    .then(([rows]) => {
                        var employee = rows;
                        console.table(employee);
                        employeeTracker();
                    })
                break;

            case 'View all departments':
                db.viewAllByDept()
                    .then(([rows]) => {
                        var department = rows;
                        console.table(department)
                        employeeTracker();
                    })
                break;

            case 'View all roles':
                db.viewAllByRole()
                    .then(([rows]) => {
                        var role = rows;
                        console.table(role);
                        employeeTracker();
                    })
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Add a role':
                addARole();
                break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Update employee role':
                updateEmpRole();
                break;
        }
    });
};


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What's the first name of the employee?`,
            name: 'firstName'
        },
        {
            type: 'input',
            message: `What's the last name of the employee?`,
            name: 'lastName'
        },
        {
            type: 'input',
            message: `What's the employee's role id number?`,
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'What is the manager id number?',
            name: 'managerId'
        }
    ])
        .then(value => {
            var employee = {
                first_name: value.firstName,
                last_name: value.lastName,
                role_id: value.roleId,
                manager_id: value.managerId
            }

            db.addEmployee(employee)
            console.log('You successfully added an employee.');
            employeeTracker();
        });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the department name?',
            name: 'department'
        }
    ])
        .then(value => {
            var depart = {
                department_name: value.department
            }
            db.addDept(depart)
            console.log('You successfully added a department.');
            employeeTracker();
        });
};

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary for this position?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department ID?',
            name: 'department'
        }
    ])
        .then(value => {
            var role = {
                title: value.role,
                department_id: value.department,
                salary: value.salary
            }
            db.addRole(role)
            console.log('You successfully added a role.');
            employeeTracker();
        });
};

function updateEmpRole() {

    db.viewAllEmp()
        .then(([rows]) => {
            var employee = rows;
            console.log(viewAllEmp());
            const employeeList = employee.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: `Which employee's role do you want to update?`,
                    choices: employeeList
                }
            ])
                .then(value => {
                    var employeeId = value.employeeId;

                    // get role titles to display
                    db.viewAllByRole()
                        .then(([rows]) => {
                            var roles = rows;
                            const rolesList = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }))

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'roleId',
                                    message: 'Select new role.',
                                    choices: rolesList
                                }
                            ]).then(value => {
                                db.updateEmployee(value.roleId, employeeId);
                                console.log('You successfully updated the employee role.');
                                employeeTracker();
                            })
                        });
                })
        })
}

// initialize node
trackerTitle();
employeeTracker();