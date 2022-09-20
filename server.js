const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require('./db/connection');
const figlet = require('figlet');

// Start DB connection

db.connect(err=>{
    if (err) throw err;
});


console.log(figlet.textSync('EMPLOYEE TRACKER', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}));


