const express = require("express")
const router = express.Router()

const handleDB = require("../db/handleDB")

// 分页查询
router.get("/getUsers", (req, res) => {

    // console.log(req.query); // page 页数  limit 条数

    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";
    if(req.query.query)pageObj.where += " and username='"+req.query.query+"' ";
    let countObj = " 1=1 ";
    if(req.query.query)countObj.where += " and username='"+req.query.query+"' ";

    // let countObj = " 1=1 "; // 查询总条数条件
    // select * from where 1=1  真的条件，可以加上where 关键字

    // 需要参数格式 
    (async function () {
        
        // 分页查询语句
        let results = await handleDB(res, "t_user", "limit", "数据库发生错误", pageObj)

        // 查询总条数
        let cn = await handleDB(res, "t_user", "find", "数据库发生错误", countObj)

        // console.log(cn.length);
        let obj = {}
        obj.code = "0000"
        obj.count = cn.length  // 总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)

    })()

})

// 新增用户
router.post("/addUser", (req, res) => {
    
    console.log(req.body);

    let { username, password, name, phone, sex, content, player, birthday } = req.body
    console.log(username, password, name, phone, sex, content, player, birthday);

    (async function () {
        let results = await handleDB(res, "t_user", "find", "数据库发生错误", "username = '" + username + "'")
        if (results.length > 0) {
            username = results[0].username;
            console.log(111);
            res.send({ msg: "用户已存在", code: "0001" })
        } else {
            let results = await handleDB(res, "t_user", "insert", "数据库发生错误", {
                username,
                password,
                name,
                phone,
                sex,
                content,
                player,
                birthday
            })

            // console.log(results);


            if (results.affectedRows == 1) {
                res.send({ msg: "插入成功", code: "0000" })
            } else {
                res.send({ msg: "插入失败", code: "0007" })
            }
        }

    })()
})

// 删除用户
router.delete("/deleteUser/:id", (req, res) =>{

    let {id}= req.params;
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res, "t_user", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})
// 批量删除用户
router.delete("/deleteAllUser/:id", (req, res) =>{

    let {id}= req.params;
    let del = "id in("+id+")";
    (async function(){
        let results = await handleDB(res, "t_user", "delete","数据库发生错误", del)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功",code:"0000"})
        }else{
            res.send({msg:"删除失败",code:"0007"})
        }
    })()
})


// 修改用户
router.post("/editUser", (req, res) => {
    
    let {id,name, img,phone,sex,content,username,password,player,birthday} = req.body;
    console.log(id,name, img,phone,sex,content,username,password,player,birthday);

    (async function(){
        let results = await handleDB(res, "t_user","update","数据库发生错误", " id="+id,{
            name, img,phone,sex,content,username,password,player,birthday
        })
            
        res.send(results!=null?results[0]:'')
    })()
})

// // 指定查询
// router.get("/getUser", (req, res) => {
    
//     let uid = req.session["uid"];
    
//     (async function () {
        
//         let results = await handleDB(res, "t_user", "find", "数据库发生错误", " id =" + uid  )

//         let obj = {}
//         obj.code = "0000"
//         obj.msg = "查询成功"
//         obj.data = results
//         res.send(obj)

//     })()

// })
// 指定修改
// router.post("/editUser2", (req, res) => {
//     let id = req.session["uid"];
//     let {stu_name, stu_img,stu_phone,stu_sex,stu_content,username,password} = req.body;
//     console.log(stu_name, stu_img,stu_phone,stu_sex,stu_content,username,password);

//     (async function(){
//         let results = await handleDB(res, "t_user","update","数据库发生错误", " id="+id,{
//             stu_name, 
//             stu_img,
//             stu_phone,
//             stu_sex,
//             stu_content,
//             username,
//             password
//         })
            
//         res.send(results!=null?results[0]:'')
//     })()
// })




module.exports = router