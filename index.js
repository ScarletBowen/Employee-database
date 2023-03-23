const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'sunday',
    database: 'workforce_db'
  },
  console.log(`Connected to the workforce_db database.`)
);

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
        cTable(results);
        init();
    });
};

viewRoles = () => {
    db.query('SELECT * FROM role', (err, results) => {
        cTable(results);
        init();
    });
}

viewEmployees = () => {
    db.query('SELECT * FROM role', (err, results) => {
        cTable(results);
        init();
    });
}

addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department you want to add?'
                
            }
        ])
        .then((answer) => {
            db.query('INSERT INTO department SET ?', answer, (err, results) => {    
                if (err) {
                    console.log(err);
                }   
                console.log('Department added successfully!');
                showDepartments();
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
                showRoles();
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
                showEmployees();
                init();
            });
        });
}

updateEmployeeRole = () => {
    // get employees from employee table
    const employeeSql = db.query `SELECT * FROM employee`;

    Connection.promise().query(employeeSql, (err, results) => {
        if (err) throw err;

    const employeeChoices = results.map(({ id, first_name, last_name }) => ({id: id, name: `${first_name} ${last_name}`}));
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the ID of the employee you want to update?'
                
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the new role ID of the employee you want to update?'

            }
        ])
        .then((answer) => {
            db.query('UPDATE employee SET ? WHERE ?', [answer, {id: answer.id}], (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log('Employee updated successfully!');
                showEmployees();
                init();
            });
        });
}
    )
}

quit = () => {
    console.log('Goodbye!');
    process.exit();
}


//updateEmployeeRole();
//1. what employee?
//2. before asking which employee, you need to know all the employees, which means you need to make a SELECT * from employee query
//3. map over (or for loop over) the results array and return an array with the employee names
//4. once you have that formatted array, you can use it as your choices in the inquirer prompt
//5. once you have the employee name, you need to get the employee id, which means you need to make another query to get the employee id
