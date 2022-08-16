var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.根据用户id获取用户银行卡
router.get('/', function (req, res, next) {

    var sql = 'select * from stock_user_card  where user_id=?'

    let data = [req.query.userId]

    console.log("data", req.query.userId)
    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            // console.log("data",data.affectedRows)

            if (data.length > 0) {
                res.send({
                    code: 1,
                    message: "获取成功",
                    data: data[0]
                })

            } else {

                res.send({
                    code: 0,
                    message: "获取失败",
                })
            }

        }

    })

});

module.exports = router;
