var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'superhumantools',
    port: 3307
  })
  
  connection.connect()

  module.exports = connection;