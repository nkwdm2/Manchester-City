const express = require("express")
const router = express.Router()
const multer = require("multer")
const sd = require("silly-datetime") // 时间处理插件
const fs = require("fs")
const path = require("path")


router.post("/upload", multer({dest:"../public/upload"}).any(),(req,res)=>{
    let {fieldname, originalname} = req.files[0]

     // 使用silly-datetime, 生成自定义格式时间
     let t = sd.format(new Date(), "YYYYMMDDHHmmss")
     // 生成随机数
     let ran = parseInt(Math.random()*8999 + 10000)

    // 创建一个路径
    const name = fieldname.slice(0, fieldname.indexOf("."))
    // 组装新的名字
    const newName = "public/upload/"+ran+t+name+path.parse(originalname).ext
    fs.rename(req.files[0].path, newName, function(err){
        if(err){
            res.send({code:'0001',msg:'上传失败'})
        }else(
            res.send({code:'0000',msg:'上传成功',src:"http://localhost:9999/"+newName.substring(6, newName.length)})
        )
    })
})

module.exports = router