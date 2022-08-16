var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var multer = require('multer');
const fs = require('fs');
const path = require('path');

// 1.上传身份证
//生成的图片放入uploads文件夹下
var upload = multer({ dest: 'public/upload/idCard' })

// 1.web上传首页轮播图

router.post('/', upload.single('idcard'), (req, res) => {

    console.log("上传图片", req.file.path)
    //读取文件路径
    fs.readFile(req.file.path, (err, data) => {
        //如果读取失败
        if (err) { return res.send('上传失败') }
        //如果读取成功
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
        //拓展名
        let extname = req.file.mimetype.split('/')[1]
        //拼接成图片名
        let keepname = time + '.' + extname
        //三个参数
        //1.图片的绝对路径
        //2.写入的内容
        //3.回调函数
        fs.writeFile(path.join(__dirname, '../../public/upload/idcard/' + keepname), data, (err) => {
            if (err) { return res.send('写入失败') }
            res.send({ code: 1, msg: '上传ok', data: '/upload/idcard/' + keepname })
        });

        let ingUrl = '/upload/idcard/' + keepname

        // 判断正面反面
        console.log("index=", req.body.index)
        if (req.body.index == 1) {
            var sql = 'update stock_user_idcard set front=?,location=? where userId=?'
        } else {
            var sql = 'update stock_user_idcard set back=?,location=? where userId=?'
        }

        db.query(sql, [ingUrl, req.body.location, req.body.userId], (err, data) => {

            if (err) {
                console.log("错误", err)
            } else {

                if (data.affectedRows > 0) {

                    console.log("路径添加到数据库成功")
                } else {
                    console.log("路径添加到数据库失败")
                }
            }


        })
    });

})

module.exports = router;
