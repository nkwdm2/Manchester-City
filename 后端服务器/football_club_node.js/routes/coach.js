const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 分页查询
router.get("/getCoachs", (req, res) => {

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
        let results = await handleDB(res, "t_coach", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_coach", "find", "数据库发生错误", countObj)

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
router.post("/addCoach", (req, res) => {
    
    console.log(req.body);

    let {coa_img,coa_name,coa_position,coa_phone} = req.body
    console.log(coa_img,coa_name,coa_position,coa_phone);

    if (coa_name == ''){
        res.send({code:"0011"})
    } else if(coa_position == ''){
        res.send({code:"0012"})
    }else{
        (async function(){
            let results = await handleDB(res, "t_coach", "insert","数据库发生错误", {
                coa_img,
                coa_name,
                coa_position,
                coa_phone
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
router.delete("/deleteCoach/:id", (req, res) =>{

    let {id}= req.params;
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res, "t_coach", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})
// 批量删除
router.delete("/deleteAllCoach/:id", (req, res) =>{

    let {id}= req.params;
    let del = "id in("+id+")";
    (async function(){
        let results = await handleDB(res, "t_coach", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})


// 修改
router.post("/editCoach", (req, res) => {
    
    let {id,coa_img,coa_name,coa_position,coa_phone} = req.body;
    console.log(id,coa_img,coa_name,coa_position,coa_phone);

    (async function(){
        let results = await handleDB(res, "t_coach","update","数据库发生错误", " id="+id,{
            coa_img,
            coa_name,
            coa_position,
            coa_phone
        })
            
        res.send(results!=null?results[0]:'')
    })()
})
module.exports = router