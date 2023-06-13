const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Dog4Life!!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const {getDepart, addDepart} = require('./department');
const {getR, addR} = require('./roles');
const {getEm, addEm, updateEm} = require("./employee");

class CLI {

    constructor(){
        this.options = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', `update an employee's role`,  ];
        this.department = [];
        this.role = [];
        this.employee = [];
    }
    loadData(){
        let sql = `SELECT department_name FROM department`;
        
        return db.promise().query(sql) 
        .then(([row, feilds])=>{
            this.department = [];
            for(let i= 0; i<row.length; i++){
                this.department.push(row[i].department_name);
            }
        })
        .then(()=>{
            sql = `SELECT title FROM em_role`
            return db.promise().query(sql) 
            .then(([row, feilds])=>{
                this.role=[];
                for(let i= 0; i<row.length; i++){
                    this.role.push(row[i].title);
                }
            })
            .catch((err)=>{
                console.log(err)
            });
        })
        .then(()=>{
            sql = `SELECT first_name, last_name FROM employee`
            return db.promise().query(sql) 
            .then(([row, feilds])=>{
                this.employee=[];
                for(let i= 0; i<row.length; i++){
                    this.employee.push(row[i].first_name + ' ' +row[i].last_name);
                }
            })
            .catch((err)=>{
                console.log(err)
            });
        })
        .catch((err)=>{
            console.log(err)
        });
         
    }
    run = () => {
        return inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: [...this.options]
            }
        ])
        .then(({option})=>{
            let choice = this.options.findIndex( (element) => element === option)
            switch(choice){
                case 0:
                    getDepart(db, true).then((row)=>{
                        this.run(); 
                    });
                    break;
                case 1:
                    getR(db, true).then(()=>{
                        this.run();
                    });
                    //this.run()
                    break;
                case 2:
                    getEm(db).then(()=>this.run());
                    break;
                case 3:
                    this.addDepartment();
                    break;
                case 4:
                    //console.log(this.role)
                    this.addRole();
                    break;
                case 5:
                    this.addEmployee();
                    break;
                case 6:
                    this.updateEmployee(db);
                    break;
                default:
                    console.log('We did not get a proper choice from user')
            }

        })
        .catch((err) => {
            console.log(err);
            console.log('Oops. Something went wrong.');
        });
    }

    addDepartment(){
        return inquirer
            .prompt([
                {
                    type:'input',
                    name:'department_name',
                    message: 'What is the name of the new department? '
                }
            ])
            .then(({department_name}) => {
                addDepart(db, department_name).then(()=>{ 
                    this.loadData()
                    this.run()
                })
            })
    }

    addRole(){
        return inquirer
            .prompt([
                {
                    type:'input',
                    name:'title',
                    message: 'What is the name of the new role? '
                },
                {
                    type:'input',
                    name:'salary',
                    message: 'What is the salary of the new role? '
                },
                {
                    type:'list',
                    name:'department_id',
                    message: 'What is the department of the new role? ',
                    choices: [...this.department]
                },
            ])
            .then((data) => {
                addR(db, data, this.department.indexOf(data.department_id)).then(()=>{
                    this.loadData()
                    .then(()=> this.run())
                    
                    
                })
            });
    }

    addEmployee(){
        return inquirer
            .prompt([
                {
                    type:'input',
                    name:'first_name',
                    message: `What is the employee's first name? `
                },
                {
                    type:'input',
                    name:'last_name',
                    message: `What is the employee's last name? `
                },
                {
                    type:'list',
                    name:'role_id',
                    message: 'What is the employees role id? ',
                    choices: [...this.role]
                },
                {
                    type:'list',
                    name:'manager_id',
                    message: `What is the employee's manger id? `,
                    choices: [...this.employee, 'None']
                },

            ])
            .then((data) => {
                //console.log (data.manager_id)
                let manager = data.manager_id;

                if(data.manager_id === `None`) manager = -1;
                else manager =this.employee.indexOf(data.manager_id) 
                //console.log(manager)
                addEm(db, data, this.role.indexOf(data.role_id), manager).then(()=>{
                    this.loadData()
                    .then(()=>this.run())
                })
            });
    }

    updateEmployee(){
        return inquirer
            .prompt([
                {
                    type:'list',
                    name:'employee_id',
                    message: `Which employee is getting a new role? `,
                    choices:[...this.employee]
                },
                {
                    type:'list',
                    name:'role_id',
                    message: 'What is the new role of this employee? ',
                    choices: [...this.role]
                },
            ])
            .then((data)=>{
                updateEm(db, this.employee.indexOf(data.employee_id), this.role.indexOf(data.role_id))
                .then(()=>{
                    this.loadData()
                    .then(()=>this.run())
                })
            })
    }

}
module.exports = CLI;