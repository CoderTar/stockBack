var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.分页获取用户列表
router.post('/', function (req, res, next) {

    let pageSize = req.body.pageSize//当前页大小
    let pageNum = req.body.pageNum//当前页

    let data = [(parseInt(pageNum) - 1) * parseInt(pageSize), parseInt(pageSize)]

    var sql = 'select * from stock_user ORDER BY user_id  DESC limit ?,?'

    db.query(sql, data, (err, data) => {

        if (err) {

            res.send({
                code: 0,
                message: "获取失败",
                data: []
            })

        } else {

            console.log("用户提现记录", data)

            let sqlTotal = 'select count(*) as total from stock_user' //as更换名称

            if (data.length > 0) {

                db.query(sqlTotal, function (err, result) {


                    pages = result[0].total / pageSize
                    var P = String(pages).indexOf('.')
                    if (P >= 1) {
                        pages = parseInt(pages) + 1
                    }

                    if (err) {
                        console.log(err)
                    } else {
                        res.send({
                            code: 1,
                            pageNum: pageNum,
                            pageSize: pageSize,
                            pages: pages,
                            message: "获取成功",
                            data: data,
                            total: result[0].total
                        })
                    }
                })

            } else {

                res.send({
                    code: 0,
                    message: "获取失败",
                    data: []
                })
            }


        }
    })

})

module.exports = router;