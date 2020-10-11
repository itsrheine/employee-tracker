const inquirer = require('inquirer');
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
async function employeeTracker() {
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
                'Remove an employee',
                'Add a role',
                'Remove a role',
                'Add a department',
                'Remove a department',
                'Update employee role',
                'Quit'
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

            case 'Remove an employee':
                removeEmployee();
                break;

            case 'Add a role':
                addARole();
                break;

            case 'Remove a role':
                removeARole();
                break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Remove a department':
                removeDepartment();
                break;

            case 'Update employee role':
                updateEmpRole();
                break;

            case 'Quit':
                quit();
                break;
        }
    });
};

// ADD
async function addEmployee() {

    db.viewAllByRole()
    .then(([rows]) => {
        var roles = rows;
        const rolesList = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }))

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
            type: 'list',
            message: `What's the employee's position?`,
            name: 'roleId',
            choices: rolesList
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
    })
};

async function addDepartment() {
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

async function addARole() {
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

// REMOVE
async function removeEmployee() {
    db.viewAllEmp()
        .then(([rows]) => {
            var employee = rows;
            const employeeList = employee.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: `Which employee would you like to remove?`,
                    choices: employeeList
                }
            ])
                .then(value => {
                    db.removeEmployee(value.employeeId);
                    console.log('You successfully removed an employee.');
                    employeeTracker();
                })
        });
}

async function removeARole() {
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
                    message: 'Which role would you like to remove?',
                    choices: rolesList
                }
            ])
                .then(value => {
                    db.removeRole(value.roleId);
                    console.log('You successfully removed a role.');
                    employeeTracker();
                })
        })
}

async function removeDepartment() {
    db.viewAllByDept()
        .then(([rows]) => {
            var department = rows;
            const deptList = department.map(({ id, department_name }) => ({
                name: department_name,
                value: id
            }))

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'Which department would you like to remove?',
                    choices: deptList
                }
            ])
                .then(value => {
                    db.removeDepartment(value.deptId);
                    console.log('You successfully removed a department.');
                    employeeTracker();
                })
        })
}

// UPDATE
async function updateEmpRole() {

                db.viewAllEmp()
                    .then(([rows]) => {
                        var employee = rows;
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

async function quit() {
    console.log('Thank you for using the employee tracker!');
    process.exit();
}

// initialize node
trackerTitle();
employeeTracker();