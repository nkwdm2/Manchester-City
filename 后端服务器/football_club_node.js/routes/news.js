const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 分页查询
router.get("/getNewss", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 order by id desc";
    if(req.query.query)pageObj.where += " and n_time='"+req.query.query+"' ";
    let countObj = " 1=1 order by id desc";
    if(req.query.query)countObj.where += " and n_time='"+req.query.query+"' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {
        
        // 分页查询语句
        let results = await handleDB(res, "t_news", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_news", "find", "数据库发生错误", countObj)

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
const db = require("../db/node_orm/index")
router.post("/addNews", (req, res) => {
    
    console.log(req.body);

    let {n_img,n_headline,n_time,n_content,states} = req.body
    console.log(n_img,n_headline,n_time,n_content,states);
    if (n_headline == ''){
        res.send({code:"0011"})
    } else if(n_img == ''){
        res.send({code:"0012"})
    }else if(n_time == ''){
        res.send({code:"0013"})
    }else{
        let News = db.model("t_news")
        News.sql("insert into t_news (n_img, n_headline,n_time,n_content,states)values ('"+n_img+"','"+n_headline+"','"+n_time+"','"+n_content+"','"+states+"')", (error,results)=>{
            console.log(results);
            res.send({msg:"插入成功",code:"0000"})
        })
    }

    
})

// 删除
router.delete("/deleteNews/:id", (req, res) =>{

    let {id}= req.params;
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res, "t_news", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})

// 批量删除
router.delete("/deleteAllNews/:id", (req, res) =>{

    let {id}= req.params;
    let del = "id in("+id+")";
    (async function(){
        let results = await handleDB(res, "t_news", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})
// 修改
router.post("/editNews", (req, res) => {
    
    let {id,n_img,n_headline,n_time,n_content,states} = req.body;
    console.log(id,n_img,n_headline,n_time,n_content,states);

    (async function(){
        let results = await handleDB(res, "t_news","update","数据库发生错误", " id="+id,{
            n_img,
            n_headline,
            n_time,
            n_content,
            states
        })
            
        res.send(results!=null?results[0]:'')
    })()
})

// 修改状态
router.post("/editNewsStates", (req, res) => {

    let { id, states } = req.body;
    console.log(id, states);

    (async function () {
        let results = await handleDB(res, "t_news", "update", "数据库发生错误", " id=" + id, { states })
        if (results.affectedRows == 1) {
            res.send({ msg: "上架成功", code: "0000", states: states })
        } else {
            res.send({ msg: "下架成功", code: "0007" })
        }

    })()
})

// 新闻指定查询
router.get("/getNewuser", (req, res) => {
    let { id, states } = req.body;
    console.log(id, states);
    (async function () {

        let result = await handleDB(res, "t_news", "find", "数据库发生错误", " states = '1'")
        console.log(result);
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()

})
module.exports = router