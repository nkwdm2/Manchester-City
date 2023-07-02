const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 分页查询
router.get("/getSchedules", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 order by id desc";
    if (req.query.query) pageObj.where += " and sc_time2='" + req.query.query + "' ";
    let countObj = " 1=1 ";
    if (req.query.query) countObj.where += " and sc_time2='" + req.query.query + "' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {

        // 分页查询语句
        let results = await handleDB(res, "t_schedule", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_schedule", "find", "数据库发生错误", countObj)

        // console.log(cn.length);
        let obj = {}
        obj.code = "0000"
        obj.count = cn.length  // 总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)

    })()

})

// 新增
router.post("/addSchedule", (req, res) => {

    console.log(req.body);

    let { sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states } = req.body
    console.log(sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states);

    if (sc_time == ''){
        res.send({code:"0011"})
    } else if(sc_time2 == ''){
        res.send({code:"0012"})
    }else if(sc_competition == ''){
        res.send({code:"0013"})
    }else if(sc_team1 == ''){
        res.send({code:"0014"})
    }else if(sc_img1 == ''){
        res.send({code:"0015"})
    }else if(sc_img2 == ''){
        res.send({code:"0016"})
    }else if(sc_team2 == ''){
        res.send({code:"0017"})
    }
    else{
        (async function () {
            let results = await handleDB(res, "t_schedule", "insert", "数据库发生错误", {
                sc_time,
                sc_time2,
                sc_competition,
                sc_team1,
                sc_img1,
                sc_team2,
                sc_img2,
                states
            })
    
            console.log(results);
            if (results.affectedRows == 1) {
                res.send({ msg: "插入成功", code: "0000" })
            } else {
                res.send({ msg: "插入失败", code: "0007" })
            }
        })()
    }
    
})

// 删除
router.delete("/deleteSchedule/:id", (req, res) => {

    let { id } = req.params;
    let del = " id=" + id;
    (async function () {
        let results = await handleDB(res, "t_schedule", "delete", "数据库发生错误", del)
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功", code: "0000" })
        } else {
            res.send({ msg: "删除失败", code: "0007" })
        }
    })()
})

// 批量删除
router.delete("/deleteAllSchedule/:id", (req, res) =>{

    let {id}= req.params;
    let del = "id in("+id+")";
    (async function(){
        let results = await handleDB(res, "t_schedule", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})
// 修改
router.post("/editSchedule", (req, res) => {

    let { id, sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states } = req.body;
    console.log(id, sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states);

    (async function () {
        let results = await handleDB(res, "t_schedule", "update", "数据库发生错误", " id=" + id, {
            sc_time,
            sc_time2,
            sc_competition,
            sc_team1,
            sc_img1,
            sc_team2,
            sc_img2,
            states
        })

        res.send(results != null ? results[0] : '')
    })()
})
// 修改状态
router.post("/editScheduleStates", (req, res) => {

    let { id, states } = req.body;
    console.log(id, states);

    (async function () {
        let results = await handleDB(res, "t_schedule", "update", "数据库发生错误", " id=" + id, { states })
        if (results.affectedRows == 1) {
            res.send({ msg: "上架成功", code: "0000", states: states })
        } else {
            res.send({ msg: "下架成功", code: "0007" })
        }

    })()
})
// 球赛赛程指定查询
// router.get("/getSchedule", (req, res) => {
//     let { id, states } = req.body;
//     console.log(id, states);
//     (async function () {

//         let result = await handleDB(res, "t_schedule", "find", "数据库发生错误", " states = '1'")
//         console.log(result);
//         let obj = {}
//         obj.code = "0000"
//         obj.msg = "查询成功"
//         obj.data = result
//         res.send(obj)
//     })()

// })


module.exports = router