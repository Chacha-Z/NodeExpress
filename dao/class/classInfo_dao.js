// let { pool } = require("../../conf/mysqlConf")
let { connection } = require("../../conf/mysqlConf")



function selectClaConsumption(params, callback){
    console.log(params);
    var querySql = "SELECT substring(created_at, 1, 10) as date, avg(cost) as cost FROM consumption where student_id in (select student_id from studentrecord where class_id=(select class_id from studentrecord where student_id = ?)) group by substring(created_at, 1, 10)  order by date;";
    connection.query(querySql, [params.student_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectClaScore(params, callback){
    console.log(params);
    var querySql = `select student_id as id, course_id, S.name AS stuname, S.sex AS stusex, 
                        avg(score) as avgscore, std(score) as stdscore from studentexamrecord SER 
                            left join subexam SE on SER.subexam_id = SE.id left join exam E on E.id = SE.exam_id 
                            left join student S on SER.student_id = S.id 
                            where SER.student_id in 
                                (select student_id from studentrecord where class_id =? ) 
                            and E.type_id != 4 and E.type_id != 22 and E.type_id != 5 and E.type_id != 18 
                            and SER.score >= 0 and S.is_left = 0 
                    group by student_id, course_id;`;
    connection.query(querySql, [params.class_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectCla(params, callback){
    console.log(params);
    var querySql = `SELECT name as label, id as value FROM class;`
    connection.query(querySql, [], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

module.exports = {
    selectClaConsumption,
    selectClaScore,
    selectCla
}