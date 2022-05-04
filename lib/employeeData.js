const { response } = require('express');
const inquirer = require('inquirer');
const db = require('../db/connection');


function employeeData() {};

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
            //ADD DEPARTMENT
            this.addDepartment();
        } else if (response.category === 'Add Role') {
            // ADD ROLE
            this.addRole();
        } else if (response.category === 'Add Employee') {
            // ADD EMPLOYEE
            this.addEmployee();
        } else if (response.category === 'Update Employee Role') {
            // UPDATE AN EMPLOYEE
            this.updateEmployeeRole();
            
        }
    })
};

//ADD NEW DEPARTMENT
employeeData.prototype.addDepartment = function() {
    inquirer.prompt ([
        {
            type: 'text',
            name: 'name',
            message: 'What is the new department name?',
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        }
    ])
    .then((response) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        var value = response.name;
        db.query(sql, value, (err, rows) => {
            if (err) throw err;
            console.log("Department has been added.");
            this.requestData();
            
        })
    });
};

//ADD NEW ROLE

employeeData.prototype.addRole = function() {
    const dept_arr = [];
    const deptId_arr = [];
    const sql =`SELECT department.* FROM department `;
        db.query(sql, (err, rows) => {
            for (let i = 0; i < rows.length; i++) {
                dept_arr.push(rows[i].name);
                deptId_arr.push(rows[i].id);
            }
            inquirer.prompt ([
                {
                    type: 'text',
                    name: 'title',
                    message: 'What is the job title for the new role?',
                    validate: userInfo => {
                        if (userInfo) {
                            return true;
                        } else {
                            console.log('Please provide a response!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for the new role?',
                    validate: userInfo => {
                        if (userInfo) {
                            return true;
                        } else {
                            console.log('Please provide a response!');
                            return false;
                        }
                    }
                }, 
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select a department:',
                    choices: dept_arr,
                    validate: userInfo => {
                        if (userInfo) {
                            return true;
                        } else {
                            console.log('Please provide a response!');
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                let role_id;
                for (let i = 0; i < dept_arr.length; i++) {
                    if (dept_arr[i] === response.department) {
                        role_id = deptId_arr[i];
                    }
                }
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?)`;
               
                var value = [response.title, response.salary, role_id]
                db.query(sql, [value], (err, rows) => {
                    if (err) throw err;
                    console.log("Role has been added.");
                    this.requestData();
                    
                })
            });
        })
    
    
    
    
};

//ADD NEW EMPLOYEE(id, first_name, last_name, role_id, department_id, manager_id)

employeeData.prototype.addEmployee = function() {
    const dept_arr = [];
    const deptId_arr = [];
    const role_arr = [];
    const roleId_arr = [];
    const manager_arr = [];

    const sqlRole = `SELECT role.* FROM role`;
    db.query(sqlRole, (err,rows) => {
        for (let i = 0; i < rows.length; i++) {
            // role_arr.push(rows[i].id + " " + rows[i].title)
            role_arr.push(rows[i].title);
            roleId_arr.push(rows[i].id);
            deptId_arr.push(rows[i].department_id);
        }
    });
    // const sqlDept = `SELECT department.* FROM department`;
    const sqlManager = `SELECT employee.* FROM employee`;

    db.query(sqlManager, (err,rows) => {
        for (let i = 0; i < rows.length; i++) {
            // manager_arr.push(rows[i].manager_id + " " + rows[i].first_name + " " + rows[i].last_name)
            manager_arr.push(rows[i].manager_id)
        }
    });
    inquirer.prompt ([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?',
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?',
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        },
        {
               
            type: 'list',
            name: 'title',
            message: 'What is the employees title?:',
            choices: role_arr,
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            },
        },
        {
               
            type: 'list',
            name: 'manager_id',
            message: 'What is the employees manager ID number?:',
            choices: manager_arr,
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            },
           
        }
    ])
    .then((response) => {
        let role_id;
        let dept_id;

        for (let i = 0; i < role_arr.length; i++) {
            if (role_arr[i] === response.title) {
                role_id = roleId_arr[i];
                dept_id = deptId_arr[i];
            } 
        }
        
        const sql = `INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES (?)`;
        var value = [response.first_name, response.last_name, role_id, dept_id, response.manager_id]
        db.query(sql, [value], (err, rows) => {
            if (err) throw err;
            console.log("Employee has been added.");
            this.requestData();
            
        })
    });
};

//UPDATE EMPLOYEE ROLE

employeeData.prototype.updateEmployeeRole = function (){
    const names_arr = [];
    const role_arr = [];
    const roleId_arr = [];
    const deptId_arr = [];
    const sqlRole = `SELECT role.* FROM role`;
        db.query(sqlRole, (err,rows) => {
            for (let i = 0; i < rows.length; i++) {
                role_arr.push(rows[i].title);
                roleId_arr.push(rows[i].id);
                deptId_arr.push(rows[i].department_id);
            }
        })
    const sqlEmp = `SELECT employee.* FROM employee`;
        db.query(sqlEmp, (err, rows) => {
                for (let i = 0; i < rows.length; i++) {
                    names_arr.push(rows[i].first_name + " " + rows[i].last_name);
                }
                inquirer.prompt ([
                    {
                        type: 'list',
                        name: 'name',
                        message: 'Which employees role do you want to update?',
                        choices: names_arr,
                        validate: userInfo => {
                            if (userInfo) {
                                return true;
                            } else {
                                console.log('Please provide a response!');
                                return false;
                            }
                        }
                    }
                ])
                .then((response) => {
                    let str_first_name = response.name.split(" ")[0];
                    updateEmployee(str_first_name);
                }); 
        })
        function updateEmployee(name) {
            inquirer.prompt ([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What would you like to update this employees role to?',
                    choices: role_arr,
                    validate: userInfo => {
                        if (userInfo) {
                            return true;
                        } else {
                            console.log('Please provide a response!');
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                let role_id;
                let dept_id;

                for (let i = 0; i < role_arr.length; i++) {
                    if (role_arr[i] === response.role) {
                        role_id = roleId_arr[i];
                        dept_id = deptId_arr[i];
                    } 
                }
                const sql = `UPDATE employee set role_id = '${role_id}', department_id = '${dept_id}' WHERE first_name = '${name}'`;
                db.query(sql, (err, rows) => {
                    if (err) throw err;
                    console.log("Employee has been updated.");
                    employeeData.prototype.requestData();
                })
            });
        };
};

module.exports = employeeData;