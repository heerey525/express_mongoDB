const express = require('express');
const path = require('path');
const db = require('./db/connect');
const { verToken } = require('./utils/token');
const cors = require('cors');

const app = express();
//设置允许跨域访问该服务.
app.use(cors())
// 解析post body
const bodypraser = require('body-parser');
app.use(bodypraser.urlencoded({ extended: true }));
app.use(bodypraser.json())

// 暴漏静态资源
app.use('/static', express.static(path.join(__dirname, '/static')))
// 路由
const userRouter = require('./router/userRouter');
const foodRouter = require('./router/foodRouter');
const fileRouter = require('./router/fileRouter');
const langRouter = require('./router/langRouter');

app.use('/user', userRouter);
app.use('/food', (req, res, next) => {
    const { token } = req.headers
    verToken(token)
    .then(() => {
        next()
    })
    .catch((err) => {
        res.send(err)
    })
}, foodRouter);
app.use('/file', (req, res, next) => {
    const { token } = req.headers
    verToken(token)
    .then(() => {
        next()
    })
    .catch((err) => {
        res.send(err)
    })
}, fileRouter);
app.use('/lang', (req, res, next) => {
    const { token } = req.headers
    verToken(token)
    .then(() => {
        next()
    })
    .catch((err) => {
        if (req._parsedUrl.pathname === '/lang/export/js' || req._parsedUrl.pathname === '/lang/export') {
            next()
        }else {
           res.send(err) 
        }
    })
}, langRouter);

app.listen(6166, () => {
    console.log('http://localhost:6166/')
})