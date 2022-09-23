const chalk = require("chalk");
const cTable = require("console.table");
const db = require("../db/connection");

// Start DB connection

db.connect((err) => {
  if (err) throw err;
});

function findAll(tableName) {

let sql = {
  department:`SELECT * FROM department`,

  role:`SELECT role.id,role.title,role.salary,department.name AS department FROM department RIGHT JOIN role ON department.id = role.department_id`,

  employee:`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`
  
}

  return new Promise((resolve, reject) => {
    db.query(sql[tableName], function (err, results, fields) {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}


function updateRow(tableName, entry) {
  let sql = `UPDATE employee SET role_id = ${entry.role} WHERE id = ${entry.first_name}`

  return new Promise((resolve, reject) => {
    db.query(sql, function (err, results, fields) {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });

}






function addRow(tableName, entry) {

return new Promise((resolve, reject) => {

let keys = Object.keys(entry);
let keyString = keys.toString();
let valueString = keys.map((e)=> `"${entry[e]}"`).toString();


db.query(`INSERT INTO ${tableName} (${keyString}) VALUES (${valueString})`, function (err, results, fields) {
    if (err) {
      reject(err);
      return;
    }
    resolve(results);
  });
        


})

    

  
}

module.exports = {
  findAll,
  addRow,
  updateRow
};
