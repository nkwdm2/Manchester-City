const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 分页查询
router.get("/getTeams", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";
    if(req.query.query)pageObj.where += " and team_name='"+req.query.query+"' ";
    let countObj = " 1=1 ";
    if(req.query.query)countObj.where += " and team_name='"+req.query.query+"' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {
        
        // 分页查询语句
        let results = await handleDB(res, "t_team", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_team", "find", "数据库发生错误", countObj)

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
router.post("/addTeam", (req, res) => {
    
    console.log(req.body);

    let {team_img,team_name,team_number,team_position,team_age} = req.body
    console.log(team_img,team_name,team_number,team_position,team_age);

    if (team_img == ''){
        res.send({code:"0011"})
    } else if(team_name == ''){
        res.send({code:"0012"})
    }else if(team_number == ''){
        res.send({code:"0013"})
    }else if(team_position == ''){
        res.send({code:"0014"})
    }else if(team_age == ''){
        res.send({code:"0015"})
    }else{
        (async function(){
            let results = await handleDB(res, "t_team", "insert","数据库发生错误", {
                team_img,
                team_name,
                team_number,
                team_position,
                team_age
            })
    
            console.log(results);
            if(results.affectedRows == 1){
                res.send({msg:"插入成功",code:"0000"})
            }else{
                res.send({msg:"插入失败",code:"0007"})
            }
        })()
    }
    
})

// 删除
router.delete("/deleteTeam/:id", (req, res) =>{

    let {id}= req.params;
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res, "t_team", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})

// 批量删除用户
router.delete("/deleteAllTeam/:id", (req, res) =>{

    let {id}= req.params;
    let del = "id in("+id+")";
    (async function(){
        let results = await handleDB(res, "t_team", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})
// 修改
router.post("/editTeam", (req, res) => {
    
    let {id,team_img,team_name,team_number,team_position,team_age} = req.body;
    console.log(id,team_img,team_name,team_number,team_position,team_age);

    (async function(){
        let results = await handleDB(res, "t_team","update","数据库发生错误", " id="+id,{
            team_img,
            team_name,
            team_number,
            team_position,
            team_age
        })
            
        res.send(results!=null?results[0]:'')
    })()
})
module.exports = router