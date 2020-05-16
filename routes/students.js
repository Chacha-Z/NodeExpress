var express  =require('express');
var router = express.Router();

let {selectExamScore, selectExamID, selectClassStu, selectClassScore, selectStu, selectStuOverall, selectStuOrder, selectStuScore, selectRadarScore, selectKaoqin, selectStuConsumption, selectStuPlot, selectStuRank, selectStuTag} = require('../dao/student/studentInfo_dao');
let {selectClaConsumption,selectClaScore, selectCla} = require('../dao/class/classInfo_dao');
let {createResult, formatOrder, formatRadar, formatKaoqinHeatMap, formatOverall} = require('../util/result');

router.get('/selectCla', function(req, res, next){
    selectCla(req.query, function(suc){
        let r = createResult(true, suc)
        // console.log(r)
        res.json(r);
    })

});

router.get('/selectClassStu', function(req, res, next){
    console.log(req.query)
    selectClassStu(req.query, function(suc){
        let r = createResult(true, suc)
        res.json(r);
    })

});


router.get('/selectClassoverall', function(req, res, next){
    console.log(req.query)
    selectClassScore(req.query, function(suc){
        let r = createResult(true, suc)
        res.json(r);
    })

});


router.get('/selectStu', function(req, res, next){
    console.log(req.query)
    selectStu(req.query, function(suc){
        let r = createResult(true, suc)
        res.json(r);
    })

});

router.get('/selectExam', function(req, res, next){
    console.log(req.query)
    selectExamScore(req.query, function(suc){
        let r = createResult(true, suc)
        // console.log(r)
        res.json(r);
    })

});

router.get('/selectExamID', function(req, res, next){
    console.log(req.query)
    selectExamID(req.query, function(suc){
        let r = createResult(true, suc)
        // console.log(r)
        res.json(r);
    })

});

router.get('/selectStuOverall', function(req, res, next){
    console.log(req.query)
    selectStuOverall(req.query, function(suc){
        let r = formatOverall(true, suc)
        res.json(r);
    })

});


router.get('/stuOrder',  function(req, res, next){

    selectStuOrder(req.query, function(suc){
        let r = formatOrder(true, suc)
        res.json(r);
    })

});


router.get('/stuCourseScore',  function(req, res, next){

    selectStuScore(req.query, function(suc){
        let r = createResult(true, suc)
        res.json(r);
    })

});


router.get('/stuCourseRank',  function(req, res, next){

    selectStuRank(req.query, function(suc){
        let r = createResult(true, suc)
        res.json(r);
    })

});


router.get('/stuRadar',  function(req, res, next){

    selectRadarScore(req.query, function(suc){
        let r = formatRadar(true, suc)
        res.json(r);
    })

});


router.get('/stuKaoqin',  function(req, res, next){

    selectKaoqin(req.query, function(suc){
        let r = formatKaoqinHeatMap(true, suc)
        res.json(r);
    })

});

router.get('/stuConsumption',  function(req, res, next){

    selectStuConsumption(req.query, function(suc){
        var result = []
        var r = createResult(true, suc);
        // console.log(r.length);
        result.push(r);
        selectClaConsumption(req.query, function(suc){
            r = createResult(true, suc);
            // console.log(r.length);
            result.push(r);
            // console.log(result);
            res.json(result);
        })
    })

});


router.get('/stuAllPlot',  function(req, res, next){
    selectClaScore(req.query, function(suc){
        r = createResult(true, suc);
        res.json(r);
    })
});

router.get('/stuSinglePlot',  function(req, res, next){
    selectStuPlot(req.query, function(suc){
        r = createResult(true, suc);
        res.json(r);
    })
});

router.get('/stuTag',  function(req, res, next){

    selectStuTag(req.query, function(suc){
        let r = createResult(true, suc)
        res.json(r);
    })

});
module.exports = router;