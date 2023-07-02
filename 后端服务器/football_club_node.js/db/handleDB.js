// 导入orm
const db = require("./node_orm/index")

function handleDB(res, tableName, methodName, errorMsg, n1, n2){
    // 根据映射，获取表
    let Model = db.model(tableName)
    let results // 返回sql语句的结果

    try {
        results = new Promise((resolve, reject)=>{
            if(!n1){
                Model[methodName]((err,data)=>{
                    if(err)reject(err)
                    resolve(data)
                })
                return // 终止当前promise,以防继续执行
            }
            // 如果n1 不为空，有参数
            if(!n2){
                Model[methodName](n1,(err,data)=>{
                    if(err)reject(err)
                    resolve(data)
                })
                return // 终止当前promise,以防继续执行
            }
            // n1,n2 都不为空
            Model[methodName](n1, n2,(err,data)=>{
                if(err)reject(err)
                resolve(data)
            })
        })
    }catch(err) {
        console.log(err); // 后端打印错误
        res.send({errMsg:errorMsg}) // 给前端发送错误信息
        return
    }
    return results
}

module.exports = handleDB