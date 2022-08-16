var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.删除某条广告
router.delete('/', function (req, res, next) {

    var sql = 'delete from stock_ad  where id=?'

    let data = [req.body.id]

    console.log("data", req.body)
    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            // console.log("data",data.affectedRows)

            if (data.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "删除成功",
                })

            } else {

                res.send({
                    code: 0,
                    message: "删除失败",
                })
            }

        }

    })

});

module.exports = router;
