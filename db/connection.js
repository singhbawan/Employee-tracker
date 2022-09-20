const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.password,
    database: 'employeetracker'
},
console.log('Connected to the employee-tracker database.\n')
);

module.exports = db;