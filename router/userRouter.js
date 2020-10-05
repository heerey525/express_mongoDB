const express = require('express');
const router = express.Router();
const User = require('../db/model/userModel');
const Mail = require('../utils/mail');
const { setToken } = require('../utils/token');

// 内存中存入验证码
let codes = {}

/**
 * @api {post} /user/reg 用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} us 用户名（邮箱）
 * @apiParam {String} ps 用户密码
 * @apiParam {code} ps 验证码
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "200",
 *       "msg": "创建成功"
 *     }
 */
router.post('/reg', (req, res) => {
    let { us, ps, code } = req.body
    if (!us || !ps || !code) return res.send({code: 500, msg: '缺少参数'})
    if (!codes[us] || (codes[us].code != code)) return res.send({code: 500, msg: '验证码错误'})
    User.find({ us })
    .then((data) => {
        if (data.length === 0) {
            return User.insertMany({ us, ps })
        } else {
            res.send({ code: 500, msg: '用户名已存在' })
        }
    })
    .then(() => {
        res.send({ code: 200, msg: '创建成功' })
    })
    .catch(() => {
        res.send({ code: 500, msg: '创建失败' })
    })
})

/**
 * @api {post} /user/login 用户登录
 * @apiName 用户登录
 * @apiGroup User
 *
 * @apiParam {String} us 用户名（邮箱）
 * @apiParam {String} ps 用户密码
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "200",
 *       "msg": "登录成功"
 *     }
 */
router.post('/login', (req, res) => {
    let { us, ps } = req.body
    if (!us || !ps) return res.send({code: 500, msg: '缺少参数'})
    
    User.find({ us, ps })
    .then((data) => {
        if (data.length>0) {
            let token = setToken({login: true, name: us})
            res.send({ code: 200, msg: '登录成功', token })
        } else {
            res.send({ code: 500, msg: '账号或密码不正确' })
        }
    })
    .catch(() => {
        res.send({ code: 500, msg: '登录失败' })
    })
})

/**
 * @api {post} /user/getMailCode 获取邮箱验证码
 * @apiName 获取邮箱验证码
 * @apiGroup User
 *
 * @apiParam {String} mail 用户名（邮箱）
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "200",
 *       "msg": "邮箱验证码发送成功"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": "500",
 *       "msg": "邮箱验证码发送失败"
 *     }
 */
router.post('/getMailCode', (req,res) => {
    const { mail } = req.body
    // 判断五分钟内不能重复发送
    // if (codes[mail] && (((new Date()).getTime() - codes[mail].ctime) < 300000) ) return res.send({ code: 500, msg: '验证码5分钟内，不可重复发送' })
    // 判断五分钟内不能超过3次
    if (codes[mail] && (((new Date()).getTime() - codes[mail].ctime) < 300000) && ((codes[mail].ctime+1) > 3)) return res.send({ code: 500, msg: '验证码5分钟内，发送次数不可大于3次' })
    const code = parseInt(Math.random()*10000);
    Mail.send(mail, code)
    .then(() => {
        // 判断五分钟内不能重复发送
        // codes[mail] = {ctime: (new Date()).getTime(), code: code}
        // 判断五分钟内不能超过3次
        if ((codes[mail] && (codes[mail].account>=3)) || !codes[mail]) {
            codes[mail] = {ctime: (new Date()).getTime(), code: code, account: 1 }
        } else {
            // codes[mail] && (codes[mail].account < 3)
            codes[mail] = {ctime: codes[mail].ctime, code: code, account: codes[mail].account++ }
        }
        console.log('存下', codes[mail])
        // codes[mail] = {ctime: (new Date()).getTime(), code: code, account: ((codes[mail] && (codes[mail].account>3)) ? 0 : codes[mail].account++)}
        res.send({ code: 200, msg: '邮箱验证码发送成功' })
    })
    .catch(() => {
        res.send({ code: 500, msg: '邮箱验证码发送失败' })
    })
})

module.exports = router