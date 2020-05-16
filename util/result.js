
function createResult(err, data){
    var dataString = JSON.stringify(data);
    var data = JSON.parse(dataString);
    return data;
}


function formatOverall(err, data){

    var dataString = JSON.stringify(data);
    var data = JSON.parse(dataString);

    // console.log('dataoverall:', data);
    var result = {}
    for(let i = 0; i < data.length; ++i){
        result[data[i].id] = data[i].score;
    }
    // console.log(result);
    return result;
}

function formatOrder(err, data){
    var dataString = JSON.stringify(data);
    var data = JSON.parse(dataString);

    // console.log(typeof data);
    // console.log(data);
    var result = new Map();
    for(let i=0; i < data.length; ++i){
        let id = data[i].exam_id;
        let course_id = data[i].course_id + "";
        let rank = data[i].class_rank;
        let title = data[i].name;
        let exam_id = data[i].exam_id;
        let type_id = data[i].type_id;
        if(!result.has(id)){
            result.set(id, {});
        }
        result.get(id)[course_id] = rank;
        result.get(id)[-1] = title;
        result.get(id)[-2] = exam_id;
        result.get(id)[-3] = type_id;
    }

    var resultValue=[];
    for(let value of result.values()){
        resultValue.push(value);
    }
    // console.log(result.values());
    // console.log(resultValue);
    // resultValue = resultValue.filter(function(item){
    //     return '1' in item;
    // });
    // console.log(resultValue);
    return resultValue;
}

function formatRadar(err, data){

    var dataString = JSON.stringify(data);
    var data = JSON.parse(dataString);

    // console.log(data instanceof Array);
    // console.log(data);
    keys = Object.keys(data[0]);
    // console.log(keys);
    var result = []
    for(let j = 0; j < keys.length-2; ++j){
        var temp = [];
        for(let i=0; i < data.length; ++i){
            temp.push({axis: data[i].name, value: Math.floor(data[i][keys[j]]), key: keys[j]})
        }
        result.push(temp);
    }
    // console.log(result);
    return result;
}

function formatKaoqinHeatMap(err, data){
    var dataString = JSON.stringify(data);
    var data = JSON.parse(dataString);

    var types = ['迟到', '早退', '校徽校服'];

    var dataLate = data.filter(function(d){
        return d.type == '迟到';
    }).map(function(d){
        return +d.month;
    });
    var dataLeave = data.filter(function(d){
        return d.type == '早退';
    }).map(function(d){
        return +d.month;
    });
    var dataClose = data.filter(function(d){
        return d.type == '校徽校服';
    }).map(function(d){
        return +d.month;
    });

    // console.log(dataLate);
    for(let i = 1; i <= 12; ++i){
        if(!dataLate.includes(i)){
            console.log(i);
            data.push({"month":i,"type":"迟到","value":0});
        }
        if(!dataLeave.includes(i)){
            console.log(i);
            data.push({"month":i,"type":"早退","value":0});
        }
        if(!dataClose.includes(i)){
            console.log(i);
            data.push({"month":i,"type":"校徽校服","value":0});
        }
    }
    return data;
}

module.exports = {
    createResult,
    formatOrder,
    formatRadar,
    formatKaoqinHeatMap,
    formatOverall
}