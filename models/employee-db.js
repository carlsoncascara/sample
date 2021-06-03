const db = require('../services/database');
const formatDate = require('../helpers/dateparser');

function Employee(employee){
    const {firstName,lastName,birthdate,skills} = employee;

    if(firstName && lastName && birthdate){   
        return [
            firstName,
            lastName,
            birthdate,
            skills,
        ];

    }
    return false;
}

const getAllEmployee = () => new Promise((resolve,reject)=> 
    db.query("SELECT * FROM employee", (err, res)=>{
        if(err){
            reject(err);
        }else{
            const data = res.map((val)=>{
                return {
                    id: val.id,
                    firstName: val.first_name,
                    lastName: val.last_name,
                    birthdate: formatDate.getDateYMDFormat(val.birthdate),
                    skills: val.skills
                }
            });
            resolve(data);
        }
    })
);

const getEmployee = (id) => new Promise((resolve, reject) =>
    db.query("SELECT * FROM employee WHERE id=?",[id], (err,res,fields) => {
        if(err){
            reject(null);
        }else{
            console.log(fields);
            if(res){
                data = {
                    id : res[0].id,
                    firstName: res[0].first_name,
                    lastName: res[0].last_name,
                    birthdate: formatDate.getDateYMDFormat(res[0].birthdate),
                    skills: res[0].skills
                };
                resolve(data);
            }else{
                reject({});
            }
        }
    })
);

const createEmployee = (employee) => new Promise((resolve,reject)=>
    db.query("INSERT INTO employee (first_name,last_name,birthdate,skills) VALUES (?,?,?,?)",[
        employee[0],employee[1],employee[2],employee[3],
    ],(err,res)=>{
        if(err){
            reject("Internal error occurred!");
        }else{
            resolve(res.insertId);
        }
    })
);

const updateEmployee = (id, employee) => new Promise((resolve,reject)=>
    db.query("UPDATE employee SET first_name=?,last_name=?,birthdate=?,skills=? WHERE id=?",[
        employee[0],employee[1],employee[2],employee[3],id
    ], (err,res)=>{
        if(err){
            console.error(err);
            reject("Internal error occurred!")
        }else{
            console.log(res);
            resolve("Ok");
        }
    })
)

const removeEmployee = (id) => new Promise((resolve,reject)=>
    db.query("DELETE FROM employee WHERE id=?",[id],(err,res)=>{
        if(err){
            console.error(err);
            reject("Internal error occurred!");
        }else{
            console.log(res);
            resolve("Ok");
        }
    })
)

module.exports = {
    Employee,
    getAllEmployee,
    getEmployee,
    createEmployee,
    updateEmployee,
    removeEmployee,
};