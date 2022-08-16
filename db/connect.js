// 数据库连接
const mysql = require("mysql")


var mysql_config = {
    host: 'localhost',
    port: "3306",
    user: "root",//数据库账号
    password: "aa123123",//数据库密码
    database: "stock",//连接的数据库名称
    dateStrings: true
}


// 1.创建连接
var db = mysql.createConnection(mysql_config)


// 2.连接错误监听
db.connect(function (err) {

    if (err) {
        // setTimeout('handleDisconnection()', 2000);
        console.log("数据库连接超时",err)
    } else {

        console.log("mysql连接成功")
    }
})


// 3.其他错误监听
db.on('error', function (err) {

    console.log("监听数据库异常", err)

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {

        db = mysql.createConnection(mysql_config)

    }

})

// 4.每隔五个小时激活一次mysql连接
let reSql = 'select * from stock_user'
setInterval(function () {
    db.query(reSql);
    console.log("抢连接")
}, 18000000);

module.exports = db
