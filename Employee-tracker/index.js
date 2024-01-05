const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CigSmoker69!',
    database: 'employee_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Welcome to the HR Control CLI.');
    promptMainMenu();
})

const mainMenu = {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
        'View All Departments.',
        'View All Roles.',
        'View All Employees.',
        'Add a Department.',
        'Add a Role.',
        'Add an Employee.',
        'Update an Employee Role.',
        'EXIT.'
    ]
};

function promptMainMenu() {
    inquirer.prompt(mainMenu).then((answers) =>{
        switch(answers.action) {
            case 'View All Departments.':
                viewDepartments();
                break;
            case 'View All Roles.':
                viewRoles();
                break;
            case 'View All Employees.':
                viewEmployees();
                break;
            case 'Add a Department.':
                promptAddDepartment();
                break;
            case 'Add a Role.':
                promptAddRole();
                break;
            case 'Add an Employee.':
                promptAddEmployees();
                break;
            case 'Update an Employee Role.':
                promptUpdateEmployeeRole();
                break;
            case 'EXIT.':
                console.log('Exiting Application.');
                connection.end();
                break;
        }
        
    })
}

function viewDepartments() {
    connection.query(`SELECT * FROM department`, (err, results) =>{
        if (err) throw err;
        console.table(results);
        promptMainMenu();
    });
}

function viewRoles() {
    connection.query(`SELECT * FROM role`, (err, results) =>{
        if (err) throw err;
        console.table(results)
        promptMainMenu();
    });
}

function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, results) =>{
        if (err) throw err;
        console.table(results);
        promptMainMenu();
    });
}

// prompt and add department

function promptAddDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    }).then((answers) => {
        addDepartment(answers);
    });
}

function addDepartment(answers) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(query, [answers.departmentName], (err, results) => {
        if (err) throw err;
        console.log('Department added.');
        promptMainMenu();
    });
}

// prompt and add role

function promptAddRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID for the role?'
        }
    ]).then((answers) => {
        addRole(answers);
    });
}

function addRole(answers) {
    const query = 'INSERT INTO role (title, salary, departmentID) VALUES (?, ?, ?)';
    connection.query(query, [answers.title, answers.salary, answers.departmentId], (err, results) => {
        if (err) throw err;
        console.log('Role added.');
        promptMainMenu();
    });
}

// prompt and add employee

function promptAddEmployees() {
    console.log('Add Employee Prompt activated')
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is their role ID?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is their managers ID? (Leave blank if no manager)'
        }
    ]).then((answers) => {
        addEmployee(answers);
    });
}

function addEmployee(answers) {
    const query = 'INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)';
    connection.query(query, [answers.firstName, answers.lastName, answers.roleId, answers.managerId || null], (err, results) => {
        if (err) throw err;
        console.log('Employee added.');
        promptMainMenu();
    });
}

// prompt and update employee role

function promptUpdateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the employees ID?'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'What is the new role ID for the employee?'
        }
    ]).then((answers) => {
        updateEmployeeRole(answers)
    })
}

function updateEmployeeRole(answers) {
    const query = 'UPDATE employee SET roleID = ? WHERE id = ?';
    connection.query(query, [answers.newRoleId, answers.employeeId], (err, results) => {
        if (err) throw err;
        console.log('Employee role updated.');
        promptMainMenu();
    });
}





