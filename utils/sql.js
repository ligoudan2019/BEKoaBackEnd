const mysql = require('mysql');
const connection = mysql.createConnection({
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'db_bx'
})

function query(sql,obj){
  return new Promise((resolve,reject)=>{
    if(obj === undefined){
      connection.query(sql,(err,data)=>{
        if(err){
          reject(err);
        }else {
          resolve(data);
        }
      })
    }else {
      connection.query(sql,obj,(err,data)=>{
        if(err){
          reject(err);
        }else {
          resolve(data);
        }
      })
    }    
  });
}

module.exports = query;