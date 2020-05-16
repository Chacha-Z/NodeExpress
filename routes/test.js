var mysql  = require('mysql');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '082740',
        port: '3306',
        database: 'educationdb',
    });
    
    connection.connect();
    
    var  sql = 'SELECT * FROM student where born_year = 2004';
    //查
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
    
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });
    
    connection.end();
    
    
    res.send('respond with a resource');
});


module.exports = router;
