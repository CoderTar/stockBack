var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.用户添加银行卡
router.get('/', function (req, res, next) {


    var sql = 'select * from stock_bank where state=1'


    db.query(sql, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {


            if (data.length > 0) {
                res.send({
                    code: 1,
                    message: "绑定成功",
                    data: data
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
