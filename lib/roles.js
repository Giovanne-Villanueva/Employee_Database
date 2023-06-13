const {textBuild} = require ('./textBuild');

const getR = (db, result)=>{
    let sql = `SELECT em_role.id AS id, title, department.department_name, salary FROM em_role JOIN department ON em_role.department_id = department.id ORDER BY id`;
    
    return db.promise().query(sql)
    .then(([rows, feilds]) =>{
        ////console.table(rows)
        textBuild(rows);
    })
    .catch((err)=>{
        console.log(err)
    });
}

const addR = (db, info, index)=>{
    //console.log(index);
    let sql = `INSERT INTO em_role (title, salary, department_id) VALUES ('${info.title}', '${info.salary}', ${index+1});`

    return db.promise().query(sql)
    .then(()=>{
        console.log(`\nWe have Successfully add new Role.`)
    })
    .catch((err)=>{
        console.log(err)
    });
}

module.exports = {
    getR,
    addR,

}