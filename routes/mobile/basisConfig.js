var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.后台获取移动端基本配置
router.get('/', function (req, res, next) {

    let sql = 'select * from stock_mobile'
    db.query(sql, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            if (data.length > 0) {
                res.send({
                    code: 1,
                    message: "获取成功",
                    data: data[0]
                })

            } else {

                res.send({
                    code: 0,
                    message: "数据为空",
                    data: data
                })
            }

        }

    })

});

module.exports = router;
