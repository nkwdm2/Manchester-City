const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 分页查询
router.get("/getStudents", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";
    if(req.query.query)pageObj.where += " and stu_name='"+req.query.query+"' ";
    let countObj = " 1=1 ";
    if(req.query.query)countObj.where += " and stu_name='"+req.query.query+"' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {
        
        // 分页查询语句
        let results = await handleDB(res, "t_management", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_management", "find", "数据库发生错误", countObj)

        // console.log(cn.length);
        let obj = {}
        obj.code = "0000"
        obj.count = cn.length  // 总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)

    })()

})

router.get("/getStudent1", (req, res) => {
    
    let mid = req.session["mid"];
    
    (async function () {
        
        let results = await handleDB(res, "t_management", "find", "数据库发生错误", " id =" + mid  )

        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)

    })()

})
// 新增
const db = require("../db/node_orm/index")
router.post("/addStudent", (req, res) => {
    
    console.log(req.body);

    let {stu_name, stu_img,stu_phone,stu_sex,stu_content,username,password} = req.body
    console.log(stu_name, stu_img,stu_phone,stu_sex,stu_content,username,password);

    // let Student = db.model("t_student")
    // Student.sql("insert into t_student (stu_name, stu_img,stu_phone,stu_sex,stu_content,username,password)values ('"+stu_name+"','"+stu_img+"','"+stu_phone+"','"+stu_sex+"','"+stu_content+"','"+username+"','"+password+"')", (error,results)=>{
    //     console.log(results);
    //     res.send({msg:"插入成功",code:"0000"})
    // })
    if (stu_name == ''){
        res.send({code:"0011"})
    } else if(stu_sex == ''){
        res.send({code:"0012"})
    }else if(username == ''){
        res.send({code:"0013"})
    }else if(password == ''){
        res.send({code:"0014"})
    }
    else {
        (async function(){
            let results = await handleDB(res, "t_management", "insert","数据库发生错误", {
                stu_name, 
                stu_img,
                stu_phone,
                stu_sex,
                stu_content,
                username,
                password
            })
            if(results.affectedRows == 1){
                res.send({msg:"插入成功",code:"0000"})
            }else{
                res.send({msg:"插入失败",code:"0007"})
            }
        })()
    }
    
})

// 删除
router.delete("/deleteStudent/:id", (req, res) =>{

    let {id}= req.params;
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res, "t_management", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})

// 批量删除
router.delete("/deleteAllStudent/:id", (req, res) =>{

    let {id}= req.params;
    let del = "id in("+id+")";
    (async function(){
        let results = await handleDB(res, "t_management", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})


// 修改
router.post("/editStudent", (req, res) => {
    
    let {id,stu_name, stu_img,stu_phone,stu_sex,stu_content,username,password} = req.body;
    console.log(id,stu_name, stu_img,stu_phone,stu_sex,stu_content,username,password);

    (async function(){
        let results = await handleDB(res, "t_management","update","数据库发生错误", " id="+id,{
            stu_name, 
            stu_img,
            stu_phone,
            stu_sex,
            stu_content,
            username,
            password
        })
            
        res.send(results!=null?results[0]:'')
    })()
})
module.exports = router