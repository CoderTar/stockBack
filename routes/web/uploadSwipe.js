var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var multer = require('multer');
const fs = require('fs');
const path = require('path');


//生成的图片放入uploads文件夹下
var upload = multer({ dest: 'public/upload/adImg' })

// 1.web上传首页轮播图

router.post('/', upload.single('img'), (req, res) => {

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
        fs.writeFile(path.join(__dirname, '../../public/upload/adImg/' + keepname), data, (err) => {
            if (err) { return res.send('写入失败') }
            res.send({ code: 1, msg: '上传ok', data: '/upload/adImg/' + keepname })
        });

        let sql = 'insert into stock_ad (image,title,location) values(?,?,?)'
        let url = '/upload/adImg/' + keepname
        let text = "默认文字"
        let ip = req.body.ip

        db.query(sql, [url, text, ip], (err, data) => {

            if (data.affectedRows > 0) {

                console.log("路径添加到数据库成功")
            } else {
                console.log("路径添加到数据库失败")
            }
        })
    });

})

module.exports = router;
