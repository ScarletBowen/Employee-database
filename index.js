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
    password: '',
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
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        cTable(results);
        init();
    });
}

  const sql = `INSERT INTO employee (first_name)
    VALUES (?)`;
  const params = "Scarlet"
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });


//updateEmployeeRole();
//1. what employee?
//2. before asking which employee, you need to know all the employees, which means you need to make a SELECT * from employee query
//3. map over (or for loop over) the results array and return an array with the employee names
//4. once you have that formatted array, you can use it as your choices in the inquirer prompt


// team
const teamCards = [];

// add employee
const addEmployee = ()=>{
    inquirer
    .prompt([
        {
            type:"input",
            name:"name",
            message:"What is the name of the employee on the team?",
        },

        {
            type:"list",
            name:"role",
            choices:["Engineer", "Intern"]
        },
        
        {
            type:"input",
            name:"id",
            message:"What is the employee ID?",
        },
        {
            type:"input",
            name:"email",
            message:"what is the email address?",
        },
        {
            type:"input",
            name:"github",
            when: (input) => input.role === "Engineer",
            message:"What is the Github username of the engineer?",
        },
        {
            type:"input",
            name:"school",
            when: (input) => input.role === "Intern",
            message:"What is the school of the intern?",
        },
        {
            type: "confirm",
            name:"oneMore",
            message:"Would you like to add one more employee to the team?",
            default: false
        }
    ])
    .then((employeeInput)=>{
        let {name, id, email, role, github, school, oneMore} = employeeInput;
        let employee;
        
        // engineer
        if (role === "Engineer"){
            employee = new Engineer (name, id, email, github);
            console.log(employee)
        }
        
        // intern
        if (role === "Intern"){
            employee = new Intern (name, id, email, school);
            console.log(employee)
        }

        teamCards.push(employee);

        // if adding one more employee, run addEmployee again
        if (oneMore) {
            addEmployee(teamCards);
        }
        else{
            generate();
        }
    })
}

// function to generate the HTML

const generate = () => {
    fs.writeFile('./dist/index.html', generateHTML(teamCards), (err) => {
        if (err) {
            console.log(err);
          } else {
            console.log("Your team profile has been generated successfully!");
           }
    })
    }

const startApp = () => {
    addManager();
}
startApp();

