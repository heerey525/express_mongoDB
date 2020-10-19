const jwt = require('jsonwebtoken');
//秘钥
const screat = 'zheshiyigemiyao';

//生成token
function setToken(playload) {
    playload.ctime = Date.now();
    // playload.exps = 1000 * 15 // 手动设置过期时间 10s
    return jwt.sign(playload, screat);
}
//验证token
function verToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, screat ,(err, data) => {
            if (!token) {
                reject({code: 502, msg: '非法请求'})
                return
            }
            if (err) {
                reject({code: 502, msg: 'token 验证失败'})
                return
            }
            const beforeTime = data.ctime + data.exps;
            const nowTime = Date.now()
            if (nowTime > beforeTime) {
                // 比对当前时间戳  jwt创建的时间+有效期  前端收到重新获取token
                reject({code: 502, msg: 'token 过期'})
                return
            }
            resolve(data)
        });
    })
}

//验证token
function getTokenInfo(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, screat ,(err, data) => {
            if (err) {
                // 比对当前时间戳  jwt创建的时间+有效期  前端收到重新获取token
                reject({code: 502, msg: 'token 过期'})
                return
            }
            resolve({code: 200, data, msg: 'token 过期'})
        });
    })
}

module.exports = { setToken, verToken, getTokenInfo }