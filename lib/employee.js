const {textBuild} = require ('./textBuild');

const getEm = (db)=>{
    let sql = `SELECT emp.id AS id, emp.first_name, emp.last_name, em_role.title AS title, department.department_name AS department, em_role.salary AS salary,  CONCAT(manager.first_name, manager.last_name) AS manager_id FROM employee AS emp 
    LEFT JOIN em_role ON emp.role_id = em_role.id 
    LEFT JOIN department ON em_role.department_id = department.id  
    LEFT JOIN employee AS manager ON manager.id = emp.manager_id ORDER BY id`
    /*`SELECT employee.id AS id, first_name, last_name, em_role.title AS title, department.department_name AS department, em_role.salary AS salary, manager_id FROM employee INNER JOIN em_role ON employee.role_id = em_role.id LEFT JOIN department ON em_role.department_id = department.id  ORDER BY id`;*/
    
    return db.promise().query(sql)
    .then(([rows, feilds]) =>{
        //console.table(rows)
        textBuild(rows);
    })
    .catch((err)=>{
        console.log(err)
    });
}

const addEm = (db, data, role_id, manager_id)=>{
    let manager = 0
    if(manager_id === -1) manager = null;
    else manager = manager_id+ 1;
    //console.log(manager)
    let sql = `INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('${data.first_name}', '${data.last_name}', ${(role_id+1)}, ${manager})`;
    return db.promise().query(sql)
    .then(() =>{
        console.log(`\nWe have successfully added in a new employee`);
    })
    .catch((err)=>{
        console.log(err)
    });
}

const updateEm = (db, id, role_id)=>{
    let sql = `UPDATE employee SET role_id = ${(role_id+1)} WHERE id = ${(id+1)}`;
    return db.promise().query(sql)
    .then(() =>{
        console.log(`\nWe have successfully update the employee's role`);
    })
    .catch((err)=>{
        console.log(err)
    });
}

module.exports ={
    getEm,
    addEm, 
    updateEm
}