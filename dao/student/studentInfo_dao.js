// let { pool } = require("../../conf/mysqlConf")
let { connection } = require("../../conf/mysqlConf")


function selectClassStu(params, callback){
    var queryStu = `select student_id as stuid, student.name as stuname from student 
                    left join studentrecord on student.id = studentrecord.student_id
                    where class_id=?;`
    connection.query(queryStu, params.class_id, function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectClassScore(params, callback){
    var queryStu = `select trim(student_id) as stuid, student.name as stuname, floor(avg(t_score)) as score, 
                    course.name as coursename, course.id as courseid from studentexamrecord E 
                        left join subexam S on E.subexam_id = S.id 
                        left join exam on exam_id = exam.id 
                        left join course on course_id = course.id 
                        left join student on student.id = student_id
                    where type_id  != 4 and type_id != 22 and course_id in (1, 2, 3, 4, 5, 6, 7, 8, 17) and class_id=?
                    group by student_id, course_id order by course_id`
    connection.query(queryStu, params.class_id, function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}


function selectExamScore(params, callback){
    var queryStu = `select score, z_score, t_score, class_rank, dengdi_score, max_score, min_score, average_score, SE.exam_id, E.name as exam_name, E.started_at, C.id as course_id, C.name as course_name from studentexamrecord SER
                    left join subexam SE on SER.subexam_id = SE.id
                    left join exam E on E.id = SE.exam_id
                    left join course C on SE.course_id = C.id
                    where student_id = ?
                    order by started_at desc;`
    connection.query(queryStu, params.student_id, function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}


function selectExamID(params, callback){
    var queryStu = `select distinct exam_id as value, E.name as label, E.started_at from studentexamrecord SER
                    left join subexam SE on SER.subexam_id = SE.id
                    left join exam E on E.id = SE.exam_id
                    where student_id = ?
                    order by E.started_at desc;`
    connection.query(queryStu, params.student_id, function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStu(params, callback){
    var queryStu = "SELECT S.id, name, sex, nation, born_year, native_place, residence_type, policy, is_stay_school, room_num, class_id	FROM student S left join studentrecord R on S.id = R.student_id where S.id = ?";
    connection.query(queryStu, params.student_id, function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStuOverall(params, callback){
    var queryStu = "select student_id, floor(avg(t_score)) as score, course.name, course.id  from studentexamrecord E left join subexam S on E.subexam_id = S.id left join exam on exam_id = exam.id left join course on course_id = course.id where type_id  != 4 and type_id != 22 and course_id in (1, 2, 3, 4, 5, 6, 7, 8, 17) group by student_id, course_id order by course_id;";
    connection.query(queryStu, params.student_id, function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStuOrder(params, callback){
    var queryStu = "select exam_id, name, course_id, class_rank, type_id from studentexamrecord E left join subexam S on E.subexam_id = S.id left join exam EX on EX.id = S.exam_id where student_id = ? and class_rank < 50 and standard > 0 order by s.started_at desc";
    connection.query(queryStu, params.student_id, function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStuScore(params, callback){
    var querySql = "select score, max_score, min_score, average_score, exam.id as exam_id, exam.name, course_id, type_id from studentexamrecord E left join subexam S on E.subexam_id = S.id left join exam on exam_id = exam.id where student_id = ? order by s.started_at asc";
    connection.query(querySql, [params.student_id, params.course_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStuRank(params, callback){
    var querySql = "select class_rank, exam.id as exam_id, exam.name, course_id, type_id from studentexamrecord E left join subexam S on E.subexam_id = S.id left join exam on exam_id = exam.id where student_id = ? order by s.started_at asc";
    connection.query(querySql, [params.student_id, params.course_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectRadarScore(params, callback){
    var querySql = "select avg(t_score) as score, course.name, course.id  from studentexamrecord E left join subexam S on E.subexam_id = S.id left join exam on exam_id = exam.id left join course on course_id = course.id where student_id = ? and type_id  != 4 and type_id != 22 and course_id in (1, 2, 3, 4, 5, 6, 7, 8, 17) group by course_id;";
    connection.query(querySql, [params.student_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}


function selectKaoqin(params, callback){
    var querySql = "SELECT substring(created_at, 6, 2) AS month, K.name as type , count(0) as value FROM kaoqinrecord R left join kaoqintype K on R.type_id = K.id WHERE student_id = ? and type_id in (99001, 99002, 99003) group by type_id, substring(created_at, 6, 2) order by type_id;";
    connection.query(querySql, [params.student_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStuConsumption(params, callback){
    var querySql = "SELECT substring(created_at, 1, 10) as date, avg(cost) as cost FROM consumption where student_id = ? group by substring(created_at, 1, 10)  order by date;";
    connection.query(querySql, [params.student_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStuPlot(params, callback){
    var querySql = "SELECT student_id as id , avg(score) as avgscore, std(score) as stdscore FROM studentexamrecord S left join subexam ST on S.subexam_id = ST.id left join exam E on E.id = ST.exam_id left join student on S.student_id = student.id where student_id in (select student_id from studentrecord where class_id = ?) and course_id = ?  and type_id != 4 and type_id != 22  and score >= 0 and is_left = 0 group by student_id;";
    connection.query(querySql, [params.class_id, params.course_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

function selectStuTag(params, callback){
    console.log(params);
    var querySql = `
        SELECT title as name, weight as value FROM tagrecord T
        left join wordcloudtag W on T.tag_id = W.id 
        where student_id = ?;
    `
    connection.query(querySql, [params.student_id], function(err, result){
        if(err){
            console.log(err.message)
            throw error;
        }else{
            callback(result);
        }
    });
}

module.exports = {
    selectClassStu,
    selectStu,
    selectStuOverall,
    selectStuOrder,
    selectStuScore,
    selectRadarScore,
    selectKaoqin,
    selectStuConsumption,
    selectStuPlot,
    selectStuRank,
    selectClassScore,
    selectExamScore,
    selectExamID,
    selectStuTag
}