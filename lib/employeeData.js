const inquirer = require('inquirer');
const db = require('../db/connection');


function employeeData() {
    // inquirer.prompt ([
    //     {
    //         type: 'list',
    //         name: 'category',
    //         message: 'What would you like to do?',
    //         choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
    //     }
        
    // ])
};

employeeData.prototype.requestData = function() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'category',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        }

    ])
    .then((response) => {
        if (response.category === 'View all Departments') {
            //VIEW DEPARTMENT
            db.query(`SELECT * FROM department`, (err, rows) => {
                console.log('\n');
                console.table(rows);
                console.log('\n');
                this.requestData();
            });
        } else if (response.category === 'View all Roles') {
            //VIEW ROLE
            const sql = `SELECT role.*, department.name
                            AS department_name
                            FROM role 
                            LEFT JOIN department
                            ON role.department_id = department.id`;
            db.query(sql, (err, rows) => {
                console.log('\n');
                console.table(rows);
                console.log('\n');
                this.requestData();
            });
        } else if (response.category === 'View all Employees') {
            //VIEW EMPLOYEE
            const sql = `SELECT employee.*, department.name AS department_name,
                            role.title AS title, 
                            role.salary AS salary
                            FROM employee 
                            LEFT JOIN department ON employee.department_id = department.id
                            LEFT JOIN role ON employee.role_id = role.id`;
            db.query (sql, (err, rows) => {
                console.log('\n');
                console.table(rows);
                console.log('\n');
                this.requestData();
            });
        }else if (response.category === 'Add Department') {
            // ADD DEPARTMENT
            // this.addDepartmentTracker();
            console.log('done')
        } else if (response.category === 'Add Role') {
            // ADD ROLES
            // this.addRoleTracker();
            console.log('done')
    
        } else if (response.category === 'Add Employee') {
            // ADD EMPLOYEES
            // this.addEmployeeTracker();
            console.log('done')
        } else if (response.category === 'Update Employee Role') {
            // UPDATE AN EMPLOYEE
            // this.updateEmployeeRoleTracker();
            console.log('done')
            
        }
    })
}


module.exports = employeeData;