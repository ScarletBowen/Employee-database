const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'sunday',
    database: 'workforce_db',
  },
);

db.connect((err) => {
    if (err) {
      console.error('Failed to connect to MySQL database:', err);
    } else {
      console.log('Connected to MySQL database.');
        init();
    }
  });


// Create a new employee
function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ]
            }
        ])
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    quit();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
}
const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        console.table(results);
        init();
    });
};

viewRoles = () => {
    db.query('SELECT * FROM role', (err, results) => {
        console.table(results);
        init();
    });
}

viewEmployees = () => {
    const sql = `SELECT 
        employee.id,
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.dept_name, 
        role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id
    ORDER BY employee.id ASC`;

    db.query(sql, (err, results) => {
        if (err) throw err;
    console.table(results);
    init();
    });
   
};

addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: 'What is the name of the department you want to add?'
                
            }
        ])
        .then((answer) => {
            let sql = `INSERT INTO department (dept_name) VALUES (?)`;
            db.query(sql,[answer.dept_name], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }   
                console.log('Department added successfully!');
                viewDepartments();
                init();
            });
        });
}

addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role you want to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role you want to add?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID of the role you want to add?'
            }
        ])
        .then((answer) => {
            db.query('INSERT INTO role SET ?', answer, (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log('Role added successfully!');
                viewRoles();
                init();
            });
        });
}

addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee you want to add?'
                
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee you want to add?'

            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role ID of the employee you want to add?'

            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the manager ID of the employee you want to add?'

            }
        ])
        .then((answer) => {
            db.query('INSERT INTO employee SET ?', answer, (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log('Employee added successfully!');
                viewEmployees();
                init();
            });
        });
}

updateEmployeeRole = () => {
    // get employees from employee table
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        const employeeArray = [];
        rows.forEach(function (employee) {
            employeeArray.push({ name: employee.first_name, value: employee.id });
        });
    
        const roleArray = [];
        rows.forEach(function (role) {
            roleArray.push({ name: role.title, value: role.role_id,  title: role.title });
        });
    
        return inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Which employee do you want to update?',
                choices: employeeArray
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select a new role for the employee:',
                choices: roleArray
            }
        ])
        .then(response => {
            const sql = `UPDATE employee SET role_id=${response.role_id} WHERE id=${response.id};`;
            db.query(sql, (err, rows) => {
                if (err) throw err;
                console.log('Employee role updated successfully!');
                viewEmployees();
                init();
            });
        })
    });
}
    
