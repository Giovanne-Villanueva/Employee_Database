const {textBuild} = require ('./textBuild');

const getDepart = (db, result)=>{
    let sql = `SELECT * FROM department`;
    
    return db.promise().query(sql)
    .then(([rows, feilds]) =>{
        
        textBuild(rows);
        //console.table(rows, [`id`, `department_name`])

    })
    .catch((err)=>{
        console.log(err)
    });
}

const addDepart = (db, info)=>{
    
    let sql = `INSERT INTO department (department_name) VALUES ('${info}');`

    return db.promise().query(sql)
    .then(()=>{
        console.log(`\nWe have Successfully add new Department.`)
    })
    .catch((err)=>{
        console.log(err)
    });
}

module.exports = {
    getDepart,
    addDepart,

}