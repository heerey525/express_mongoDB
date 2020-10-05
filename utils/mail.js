"use strict";
const nodemailer = require("nodemailer");

// 创建发送邮件的对象
const transporter = nodemailer.createTransport({
host: "smtp.qq.com", // 发送发邮件
port: 465, // 端口
secure: true, // true for 465, false for other ports
auth: {
    user: '发送方邮箱地址', // 发送方邮箱地址
    pass: 'mtp验证码', // mtp验证码
},
});

// 邮件信息
// 发送邮件
function send(mail, code) {
    const mailObj = ({
        from: '"测试的验证码" <发送方邮箱地址>', // 邮件标题 发送方邮箱地址
        to: mail, // list of receivers
        subject: "验证码", // Subject line
        text: `您的验证码是：${code}，有效期5分钟`, // plain text body
    });

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailObj, (err, data) => {
            if (err) {
                reject()
            } else {
                resolve()
            }
        });
    })
}

module.exports = { send }