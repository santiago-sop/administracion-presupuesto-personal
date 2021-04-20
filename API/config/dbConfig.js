const mysql = require('mysql');

const options = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_balance'
}

const connection_db = mysql.createConnection(options);

connection_db.connect((err)=>{
    if(err) throw err
    else console.log('Conexion exitosa')
})

module.exports = connection_db;