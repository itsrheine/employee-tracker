const mysql = require('mysql');

// Connect to database
const db = new mysql.Database('./db/employee.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the employee database.');
});

module.exports = db;