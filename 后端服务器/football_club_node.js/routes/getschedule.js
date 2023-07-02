const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 球赛赛程指定查询
router.get("/getSchedule", (req, res) => {
    let { id, states } = req.body;
    console.log(id, states);
    (async function () {

        let result = await handleDB(res, "t_schedule", "find", "数据库发生错误", " states = '1'")
        console.log(result);
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()

})

// 分页查询
router.get("/getAmidithions2", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";
    if(req.query.query)pageObj.where += " and coa_name='"+req.query.query+"' ";
    let countObj = " 1=1 ";
    if(req.query.query)countObj.where += " and coa_name='"+req.query.query+"' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {
        
        // 分页查询语句
        let results = await handleDB(res, "t_amidithion", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_amidithion", "find", "数据库发生错误", countObj)

        // console.log(cn.length);
        let obj = {}
        obj.code = "0000"
        obj.count = cn.length  // 总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)

    })()

})

// 分页查询
router.get("/getNewss2", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    // pageObj = {}
    // pageObj.number = req.query.page
    // pageObj.count = req.query.limit
    // pageObj.where = " states=1 ";
    // if(req.query.query)pageObj.where += " and n_time='"+req.query.query+"' ";
  
    
    // if(req.query.query)countObj.where += " and n_time='"+req.query.query+"' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {
        
        // 分页查询语句
        // let results = await handleDB(res, "t_news", "limit", "数据库发生错误", pageObj)
        let countObj = " states=1 order by id desc limit 0,";
        let aa = req.query.limit
        
        // // 查询总条数
        let cn = await handleDB(res, "t_news", "find", "数据库发生错误", countObj + aa)

        // console.log(cn.length);
        let obj = {}
        obj.code = "0000"
        // obj.count = cn.length  // 总条数
        obj.msg = "查询成功"
        obj.data = cn
        // obj.data = results
        
        res.send(obj)

    })()

})

// 指定查询
router.get("/getUser1", (req, res) => {
    
    let uid = req.session["uid"];
    
    (async function () {
        
        let results = await handleDB(res, "t_user", "find", "数据库发生错误", " id =" + uid  )

        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)

    })()

})
// router.get("/getStudent1", (req, res) => {
    
//     let mid = req.session["mid"];
    
//     (async function () {
        
//         let results = await handleDB(res, "t_management", "find", "数据库发生错误", " id =" + mid  )

//         let obj = {}
//         obj.code = "0000"
//         obj.msg = "查询成功"
//         obj.data = results
//         res.send(obj)

//     })()

// })

// 修改用户
router.post("/editUser1", (req, res) => {
    
    let {id,name, img,phone,sex,content,username,password,player,birthday} = req.body;
    console.log(id,name, img,phone,sex,content,username,password,player,birthday);

    (async function(){
        let results = await handleDB(res, "t_user","update","数据库发生错误", " id="+id,{
            name, img,phone,sex,content,username,password,player,birthday
        })
            
        res.send(results!=null?results[0]:'')
    })()
})
module.exports = router