const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'lcoalhost ',
  user: 'root',
  password: '123456',
  database: 'test'
});

connection.connect();

connection.query