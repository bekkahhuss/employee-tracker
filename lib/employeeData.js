const { response } = require('express');
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
            //ADD DEPARTMENT
            this.addDepartment();
        } else if (response.category === 'Add Role') {
            // ADD ROLES
            this.addRole();
    
        } else if (response.category === 'Add Employee') {
            // ADD EMPLOYEE
            // this.addEmployeeTracker();
            console.log('done')
        } else if (response.category === 'Update Employee Role') {
            // UPDATE AN EMPLOYEE
            // this.updateEmployeeRoleTracker();
            console.log('done')
            
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
    const deptid_arr = [];
    const sql =`SELECT department.* FROM department `;
        db.query(sql, (err, rows) => {
            for (let i = 0; i < rows.length; i++) {
                dept_arr.push(rows[i].name + " id " + rows[i].id);
                deptid_arr.push(rows[i].id);
            }
            inquirer.prompt ([
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is the ID number for the new role?',
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
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department id:',
                    choices: deptid_arr,
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
                const sql = `INSERT INTO role (id, title, salary, department_id) VALUES (?)`;
               
                var value = [response.id, response.title, response.salary, response.department_id]
                db.query(sql, [value], (err, rows) => {
                    if (err) throw err;
                    console.log("Role has been added.");
                    this.requestData();
                    
                })
            });
        })
    
    
    
    
};

//ADD NEW EMPLOYEE(id, first_name, last_name, role_id, department_id, manager_id)

employeeData.prototype.newEmployee = function() {
   const role_arr = [];
   const dept_arr = [];
   const manager_arr = [];
   const sqlRole = `SELECT role.* FROM role`;
   const sqlDept = `SELECT department.* FROM department`;
   const sqlManager = `SELECT employee.* FROM employee`;
    db.query(sqlRole, (err,rows) => {
        for (let i = 0; i < rows.length; i++) {
            role_arr.push(rows[i].role_id + rows[i].title)
        }
        inquirer.prompt ([
            {
                type: 'input',
                name: 'id',
                message: 'What is the employee ID number?',
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
                name: 'role_id',
                message: 'What is the role ID number?:',
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
    });
    db.query(sqlDept, (err,rows) => {
        for (let i = 0; i < rows.length; i++) {
            dept_arr.push(rows[i].id + rows[i].name)
        }
        inquirer.prompt ([
            {
                
                type: 'list',
                name: 'department_id',
                message: 'What is the employee department ID number?:',
                choices: dept_arr,
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
    });
    db.query(sqlManager, (err,rows) => {
        for (let i = 0; i < rows.length; i++) {
            manager_arr.push(rows[i].manager_id + " " + rows[i].first_name + " " + rows[i].last_name)
        }
        inquirer.prompt ([
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
    });
    .then((response) => {
        
    })
   
    
};


module.exports = employeeData;