var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.外面修改密码身份验证
router.post('/', function (req, res, next) {

    var sql = 'select * from stock_user_idcard WHERE  realName=? and idCard=?'

    let data = [req.body.realName, req.body.idCard]

    console.log("data", req.query.userId)
    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            // console.log("data",data.affectedRows)

            if (data.length > 0) {
                res.send({
                    code: 1,
                    message: "验证成功",
                    data: data[0]
                })

            } else {

                res.send({
                    code: 0,
                    message: "验证失败",
                })
            }

        }

    })

});

module.exports = router;
