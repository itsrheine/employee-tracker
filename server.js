const inquirer = require('inquirer');
const db = require('./db/employeeDb');

const trackerTitle = () => {

    console.log (
        `
        +------------------+
        | EMPLOYEE TRACKER |
        +------------------+
        `
    )
};

// Main index node directory
const employeeTracker = () => {

    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'index',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'Add an employee',
                'Remove an employee',
                'Update employee role',
                'Update employee manager'
            ]
        }
    ])
        .then(function(value) {
            switch (value.index) {

                case 'View all employees':
                    db.getAllEmp();  
                    // GET EMPLOYEES from db JS!!!
                    viewAllEmployees();
                    break;

                case 'View all employees by department':
                    viewAllByDept();
                    break;

                case 'View all employees by manager':
                    viewAllByMgr();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Remove an employee':
                    removeEmployee();
                    break;

                case 'Update employee role':
                    updateEmpRole();
                    break;

                case 'Update employee manager':
                    updateEmpMgr();
                    break;
            }
        })
};

function viewAllEmployees() {
    // console log the table of all employees
    employeeTracker();
};

function viewAllByDept() {
    // console log the table of all employees
    employeeTracker();
};

function viewAllByMgr() {
    // console log the table of all employees
    employeeTracker();  
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'empRole',
            message: `Are you a manager?`
        }
    ]);
    if (answer.empRole === true) {
        // employee manager_id is not null and continue

        addEmployeeCont();
    }
    else {
        // employee manager_id is null
        addEmployeeCont();
    }
}

function addEmployeeCont() {
    inquirer.prompt ([
        {
            type: 'text',
            name: 'firstname',
            message: `What is the employee's first name?`
        },
        {
            type: 'text',
            name: 'lastname',
            message: `What is the employee's last name?`
        },
        {
            type: 'checkbox',
            name: 'role',
            message: `What is the employee's role?`,
            choices: [
                'Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Accountant',
                'Legal Team Lead',
                'Lawyer'
            ]
        },
        {
            name: 'prompt note',
            message: 'You have successfully added a new employee!'
        }
    ]);
    employeeTracker();
};

function removeEmployee() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'remove',
            message: `Which employee would you like to remove?`
        },
}


// initialize node
trackerTitle();
employeeTracker();