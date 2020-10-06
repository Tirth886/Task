const mysql = require('mysql');

// Setting up the Connection + Database
var con = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task'

});

con.connect(function(err) {
    if (err) throw err
});

exports.con = con;