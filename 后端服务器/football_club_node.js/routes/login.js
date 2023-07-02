const express = require("express")
const router = express.Router()

const fs = require("fs")
const path = require("path")

const handleDB = require("../db/handleDB")



// 安装数据库 npm install mysql
router.all("/login", (req, res) => {
    // 获取请求参数post 方法
    let { username, password } = req.body
    console.log(username, password);

    (async function () {
        let results = await handleDB(res, "t_management", "find", "数据库发生错误", "username = '" + username + "' and password = '" + password + "'")
        // 把查询结果进行处理  if(results)
        if (results.length > 0) {
            //服务器session 保存登录信息
            let startTime = new Date().getTime()
            let token = { code: "asdfghjkl&&" + results[0].username + results[0].password + results[0].id, startTime: startTime }
            req.session["token"] = token
            req.session["mid"] = results[0].id
            console.log(token);
            // res.send({ msg: "查询成功", code: "0000"})
            res.send({ msg: "查询成功", code: "0000", token: token,username: results[0].username, password: results[0].password, id: results[0].id })
        } else {
            res.send({ msg: "查询失败!账号密码不存在", code: "0002" })
        }



    })()


})
router.all("/login2", (req, res) => {
    // 获取请求参数post 方法
    let { username, password } = req.body
    console.log(username, password);
    (async function () {
        let results = await handleDB(res, "t_user", "find", "数据库发生错误", "username = '" + username + "' and password = '" + password + "'")
        // 把查询结果进行处理  if(results)
        if (results.length > 0) {
            // 服务器session 保存登录信息
            let startTime = new Date().getTime()
            let token2 = { code: "asdfghjkl&&" + results[0].username + results[0].password + results[0].id, startTime: startTime }
            req.session["token2"] = token2
            console.log(1212);
            console.log(token2);
            req.session["uid"] = results[0].id

            res.send({ msg: "查询成功", code: "0000", token2: token2, username: results[0].username, password: results[0].password, id: results[0].id })
        }
        else {
            res.send({ msg: "查询失败!账号密码不存在", code: "0002" })
        }



    })()


})

// 指定查询
router.get("/getUser12", (req, res) => {
    (async function () {
        let authToken2 = req.headers["authtoken2"];// 获取请求头部的信息
        console.log(000);
        console.log(authToken2);
        console.log(111);
        if (authToken2) {
            console.log("authToken2找到你了");
            let obj = {}
            obj.code = "0000"
            obj.msg = "查询成功"
            res.send(obj)
                                                                                

            
        } else if (!authToken2) {
            console.log("authToken2呢");
            let obj = {}
            obj.code = "1111"
            obj.msg = "查询成功"
            res.send(obj)
        }
    })()
})

// 注册
router.post("/addUser2", (req, res) => {

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



module.exports = router