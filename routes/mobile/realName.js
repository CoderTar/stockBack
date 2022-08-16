var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.添加实名认证
router.post('/', function (req, res, next) {

    console.log("data", req.body)

    var sql = 'insert into stock_user_idcard (userId,realName,idCard) values(?,?,?)'

    let data = [req.body.userId, req.body.realName, req.body.idCard]


    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            if (data.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "绑定成功",
                })

            } else {

                res.send({
                    code: 0,
                    message: "绑定失败",
                })
            }

        }

    })

});

module.exports = router;
