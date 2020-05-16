let mysql = require("mysql");

let mysql_config = {
    host: '127.0.0.1',
    user: 'root',
    password: '082740',
    database: 'educationdb',
    port: 3306
};

// let pool = mysql.createPool(mysql_config);

// module.exports = {
//     pool
// };

var connection = mysql.createConnection(mysql_config);
connection.connect();
module.exports = {
    connection
}