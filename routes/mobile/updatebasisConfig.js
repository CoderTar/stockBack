var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.后台更新移动端基本配置
router.post('/', function (req, res, next) {

    var sql = 'update stock_mobile set company_title=?,company_address=?,swipe_notice=?,popup_notice=?,withdrawal_state=?'

    // var sql = 'update stock_mobile set company_title=?'
    let data = [req.body.title, req.body.address, req.body.swipeNotic, req.body.popupNotic, req.body.withdrawalState]
    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败")

        } else {

            // console.log("data",data.affectedRows)

            if (data.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "修改成功",
                })

            } else {

                res.send({
                    code: 0,
                    message: "修改失败",
                })
            }

        }

    })

});

module.exports = router;
