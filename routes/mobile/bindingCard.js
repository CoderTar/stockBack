var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.用户添加银行卡
router.post('/', function (req, res, next) {

    console.log("data", req.body)

    var sql = 'insert into stock_user_card (user_id,id_card,bank_name,bank_province,bank_city,bank_card,bank_user,bank_mobile,bank_address) values(?,?,?,?,?,?,?,?,?)'

    let data = [req.body.userId, req.body.idCard, req.body.bankName, req.body.bankProvince, req.body.bankCity, req.body.bankCard, req.body.bankUser, req.body.bnakMobile, req.body.bankAddress]


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
