const express = require("express")

// 引入config 配置模块
const config = require("./appConfig")
const util = require("./utils/index")




const app = express()

// 执行配置文件
config(app)

// 注册路由
const login = require("./routes/login")
const ceshi = require("./routes/ceshi")
const management = require("./routes/management")
const user = require("./routes/user")
const coach = require("./routes/coach")
const team = require("./routes/team")
const amidithion = require("./routes/amidithion")
const schedule = require("./routes/schedule")
const ticket = require("./routes/ticket")
const adticket = require("./routes/adticket")
const ticketuser = require("./routes/ticketuser")
const getschedule = require("./routes/getschedule")
const upload = require("./routes/upload")
const news = require("./routes/news")
const index = require("./routes/index")


// 使用路由
// 管理后端数据的时候，一定要勾子函数
app.use(login)
app.use(index)
app.use(ticketuser)
app.use(getschedule)
// app.use(amidithion)
// app.use(ticket)
// app.use(adticket)
// app.use(cr7)
// app.use(ceshi)
// app.use(student)
// app.use(user)
// app.use(coach)
// app.use(team)
// app.use(schedule)
// app.use(upload)

app.use(util.checkLogin,news)
app.use(util.checkLogin,amidithion)
app.use(util.checkLogin,ticket)
app.use(util.checkLogin,adticket)
app.use(util.checkLogin,ceshi)
app.use(util.checkLogin,management)
app.use(util.checkLogin,user)
app.use(util.checkLogin,coach)
app.use(util.checkLogin,team)
app.use(util.checkLogin,schedule)
app.use(util.checkLogin,upload)


app.listen("9999",()=>{
    console.log("服务器启动");
})