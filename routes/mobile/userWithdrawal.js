var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var { createordernum } = require('../../public/randomOrderid')


// 1.用户进行账户提现
router.post('/', function (req, res, next) {

    console.log("data", req.body)

    var sql = 'insert into stock_user_withdraw (userID,outMoney,arriveMoney,tip,orderID,type,state,account,updateBy,memo,realName,phone) values(?,?,?,?,?,?,?,?,?,?,?,?)'

    let orderID = createordernum()

    console.log("orderid", orderID)

    let data = [req.body.userID, req.body.outMoney, 0, 0, orderID, 0, 0, req.body.account, 0, "暂无", req.body.realName, req.body.phone]


    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            if (data.affectedRows > 0) {


                res.send({
                    code: 1,
                    message: "申请提交成功",
                })

            } else {

                res.send({
                    code: 0,
                    message: "申请提交失败",
                })
            }

        }

    })

});

module.exports = router;
