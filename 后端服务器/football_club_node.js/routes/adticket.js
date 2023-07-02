const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 分页查询
router.get("/getAdTickets", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";
    if (req.query.query) pageObj.where += " and uid='" + req.query.query + "' ";
    let countObj = " 1=1 ";
    if (req.query.query) countObj.where += " and uid='" + req.query.query + "' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {

        // 分页查询语句
        let results = await handleDB(res, "t_ticketuser", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_ticketuser", "find", "数据库发生错误", countObj)

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
router.post("/addAdTicket", (req, res) => {

    console.log(req.body);

    let { sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states,pitch,uid } = req.body
    console.log(sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states,pitch,uid);

    (async function () {
        let results = await handleDB(res, "t_ticketuser", "insert", "数据库发生错误", {
            sc_time,
            sc_time2,
            sc_competition,
            sc_team1,
            sc_img1,
            sc_team2,
            sc_img2,
            states,
            pitch,
            uid
        })

        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "插入成功", code: "0000" })
        } else {
            res.send({ msg: "插入失败", code: "0007" })
        }
    })()
})

// 删除
router.delete("/deleteAdTicket/:id", (req, res) => {

    let { id } = req.params;
    let del = " id=" + id;
    (async function () {
        let results = await handleDB(res, "t_ticketuser", "delete", "数据库发生错误", del)
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功", code: "0000" })
        } else {
            res.send({ msg: "删除失败", code: "0007" })
        }
    })()
})
// 批量删除
router.delete("/deleteAllAdTicket/:id", (req, res) =>{

    let {id}= req.params;
    let del = "id in("+id+")";
    (async function(){
        let results = await handleDB(res, "t_ticketuser", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})

// 修改
router.post("/editAdTicket", (req, res) => {

    let { id,sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states,pitch,audit,sc_pay,sc_price } = req.body
    console.log(id,sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states,pitch,audit,sc_pay,sc_price);

    (async function () {
        let results = await handleDB(res, "t_ticketuser", "update", "数据库发生错误", " id=" + id, {
            audit:audit
        })

        res.send(results != null ? results[0] : '')
    })()
})
router.post("/edAllAdTicket", (req, res) =>{

    let id = req.body;
    let ed = "id in("+id+")";
    
    
    (async function(){
        let results = await handleDB(res, "t_ticketuser", "update","数据库发生错误",ed,{
            audit:'审核通过'
        })
        if(results.affectedRows == 1){
            res.send({msg:"审核成功",code:"0000"})
        }else{
            res.send({msg:"审核失败",code:"0007"})
        }
    })()
})
router.post("/ednoAllAdTicket", (req, res) =>{

    let id = req.body;
    let ed = "id in("+id+")";
    
    
    (async function(){
        let results = await handleDB(res, "t_ticketuser", "update","数据库发生错误",ed,{
            audit:'审核不通过'
        })
        if(results.affectedRows == 1){
            res.send({msg:"审核成功",code:"0000"})
        }else{
            res.send({msg:"审核失败",code:"0007"})
        }
    })()
})
// 修改状态
router.post("/editAdTicketStates", (req, res) => {

    let { id, states, } = req.body;
    console.log(id, states);
    
    (async function () {
        let results = await handleDB(res, "t_ticketuser", "update", "数据库发生错误", " id=" + id,{ 
            states
        })
        console.log(states);
        
        if (states == 1) {
            let { id, states, } = req.body;
            let results = await handleDB(res, "t_ticketuser", "update", "数据库发生错误", " id=" + id, { 
                audit:"审核通过"
            })
            res.send({msg:"审核通过",code:"0011"})
        } else if(states == 0) {
            let { id, states, } = req.body;
            let results = await handleDB(res, "t_ticketuser", "update", "数据库发生错误", " id=" + id, { 
                audit:"待审核"
            })
            res.send({msg:"待审核",code:"0012"})
        }

    })()
    
})




module.exports = router