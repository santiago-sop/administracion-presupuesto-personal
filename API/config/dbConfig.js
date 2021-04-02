const mysql = require('mysql');

const connection_db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_balance'
});

connection_db.connect((err)=>{
    if(err) throw err
    else console.log('Conexion exitosa')
})

module.exports = connection_db;