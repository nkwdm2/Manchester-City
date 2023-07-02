const fs = require("fs");
const path = require("path");

function checkLogin2(req, res, next) {
    console.log("曾经来过这里222！");
    // 跨域访问
    res.header("Access-Control-Allow-Origin", "*")
    // 在这里进行是否已经登录的判断。
    let token2 = req.session["token2"];// 获取本地token;
    let authToken2 = req.headers["authtoken2"];// 获取请求头部的信息
    let url = req.url;// 获取请求链接
    console.log(url == '/login');
    console.log(12345);
    console.log(token2);
    console.log(123456);
    console.log(1234567);
    console.log(authToken2);
    
    if (url == '/login') {// 如果是请求登录的路径，放行
        next()
    } else if (url == '/upload' || url == 'upload') {
        next()
    }else if(url == '/login2'){
        next()
    }
     else if (authToken2) {// 如果两个的token值一样的话，放行
        authToken2 = JSON.parse(authToken2)
        if (token2.code == authToken2.code && token2.startTime == authToken2.startTime) {
            next()
        }
        
        else {
            res.send({ code: "0055", msg: "token不一致，请先登录！" });
        }
    } 
     
    else {
        res.send({ code: "0055", msg: "请先登录!!!" });
    }
}




module.exports = {
    checkLogin2
}