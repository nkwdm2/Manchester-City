const express = require("express")
const router = express.Router()

const fs = require("fs")
const path = require("path")


// 跳转登录页面
// router.get("/Login",(req,res)=>{
//     const regPage = fs.readFileSync(path.join(__dirname, "../views", "login.html"), "utf-8")
//     res.send(regPage)
// })
router.get("/gin",(req,res)=>{
    res.render("index",{abc:"12345678"})
})
router.get("/gin1",(req,res)=>{
    let token = req.session["token"]
    console.log(token);
    res.render("login",{token})
})


module.exports = router