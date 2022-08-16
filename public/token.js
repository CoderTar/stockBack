//用于生成和解析token
var jwt = require('jsonwebtoken');
var signkey = 'd32ac0729bb03b80d96e174351167251';

var expiresIn = 60 * 2000;    //时效 (秒)20分钟

exports.setToken = function (username, userid) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            name: username,
            _id: userid
        }, signkey, { expiresIn: expiresIn });
        resolve(token);
    })
}

exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}