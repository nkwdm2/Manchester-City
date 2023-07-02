const fs = require("fs");
const path = require("path");

function checkLogin(req, res, next) {
    console.log("曾经来过这里！");
    // 跨域访问
    res.header("Access-Control-Allow-Origin", "*")
    // 在这里进行是否已经登录的判断。
    let token = req.session["token"];// 获取本地token;
    let authToken = req.headers["authtoken"];// 获取请求头部的信息
    let url = req.url;// 获取请求链接
    console.log(url == '/login');
    console.log('token在不在');
    console.log(token);
    console.log('authToken在不在');
    console.log(authToken);
    if (url == '/login') {// 如果是请求登录的路径，放行
        next()
    } else if (url == '/upload' || url == 'upload') {
        next()
    }else if(url == '/login2'){
        next()
    }
     else if (authToken) {// 如果两个的token值一样的话，放行
        authToken = JSON.parse(authToken)
        if (token.code == authToken.code && token.startTime == authToken.startTime) {
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
    checkLogin
}