const mysql = require('mysql2');

module.exports = mysql.createConnection({
    user:'root',
    host:'localhost', 
    password:'password',
    database:'mess', 
});  