const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 球赛赛程指定查询
router.get("/getTicketuser", (req, res) => {
    let { id, states } = req.body;
    console.log(id, states);
    (async function () {

        let result = await handleDB(res, "t_ticket", "find", "数据库发生错误", " states = '1'")
        console.log(result);
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()

})

router.post("/addTicketuser", (req, res) => {

    console.log(req.body);

    let { sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states,pitch,audit,sc_pay,sc_price } = req.body
    console.log(sc_time, sc_time2, sc_competition, sc_team1, sc_img1, sc_team2, sc_img2, states,pitch,audit,sc_pay,sc_price);

    let uid = req.session["uid"];

    (async function () {
        let results = await handleDB(res, "t_ticketuser", "insert", "数据库发生错误", {
            sc_time:sc_time,
            sc_time2:sc_time2,
            sc_competition:sc_competition,
            sc_team1:sc_team1,
            sc_img1:sc_img1,
            sc_team2:sc_team2,
            sc_img2:sc_img2,
            states:0,
            pitch:pitch,
            uid:uid,
            sc_price:sc_price,
            audit:"待审核",
            sc_pay:"去支付"
        })

        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "插入成功", code: "0000" })
        } else {
            res.send({ msg: "插入失败", code: "0007" })
        }
    })()
})

// 个人球票指定查询指定查询
router.get("/getTicketuser2", (req, res) => {

    
    let { id, audit } = req.body;
    console.log(id, audit);
    let uid = req.session["uid"];
   
    (async function () {

        let result = await handleDB(res, "t_ticketuser", "find", "数据库发生错误", "uid = '" + uid + "' and audit = '待审核'")
        console.log(result);
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()

})
router.get("/getTicketuser22", (req, res) => {

    
    let { id, audit } = req.body;
    console.log(id, audit);
    let uid = req.session["uid"];
   
    (async function () {

        let result = await handleDB(res, "t_ticketuser", "find", "数据库发生错误", "uid = '" + uid + "' and audit = '审核通过'" )
        console.log(result);
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()

})
router.get("/getTicketuser3", (req, res) => {

    
    let { id, audit } = req.body;
    console.log(id, audit);
    let uid = req.session["uid"];
   
    (async function () {

        let result = await handleDB(res, "t_ticketuser", "find", "数据库发生错误", "uid = '" + uid + "' and audit = '审核不通过'" )
        console.log(result);
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()

})


module.exports = router