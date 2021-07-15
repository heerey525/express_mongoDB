# Node后台管理系统

#### 介绍
express+mongoDB的一套后台管理系统后端部分，前端部分（[vue后台管理系统](https://github.com/heerey525/express_mongodb_web)），[演示地址](https://heerey.cn/expressMongoDB)

#### 软件架构
1. 基于express+mongoDB实现的一套后台管理系统，功能点有：

邮箱验证、注册、登录、jwt验证、用户管理、权限列表、角色列表、商品的增删改查、国际化管理（增删改查、批量添加、excel导入导出、导出js文件）、图片上传等

2. 利用apidoc生成接口文档 [文档生成示例](https://heerey525.github.io/express_mongoDB/apidoc/)

3. 数据库ORM使用[Mongoose](http://www.mongoosejs.net/)

4. 用到的依赖

   ```javascript
   "archiver": "^5.0.0",
   "cors": "^2.8.5",
   "express": "^4.17.1",
   "jsonwebtoken": "^8.5.1",
   "mongoose": "^5.9.25",
   "multer": "^1.4.2",
   "nodemailer": "^6.4.10",
   "qiniu": "^7.3.2",
   "xlsx": "^0.16.6"
   ```

5. 目录结构

   ```
   .
   ├── apidoc  命令生成的接口文档
   ├── db  数据库相关
         ├── model  定义表结构
         └── connect.js  连接数据库
   ├── output  导出多语言JS临时存放点（用于前端下载）
   ├── router  接口路由（进行数据库CRUD）
   ├── sql  本项目用到的sql文件（导入到MongoDB数据库）
         └── mongoDB命令.txt
   ├── static  静态资源（暴露在外部可访问）
         ├── excel  导出excel临时存放点（用于前端下载）
         ├── img  图片资源
         └── rar  导出rar压缩文件临时存放点（用于前端下载）
   ├── utils  公共JS方法或变量
         ├── counter.js  为数据库表自增id
         ├── exportXlsx.js  导出excel相关方法
         ├── mail.js  邮箱发验证码
         ├── qiniu.js  七牛云上传方法
         ├── rar.js  rar压缩
         └── token.js  生成、验证token
   ├── 多语言文件.xlxs  用于测试多语言批量导入的模板
   ├── apidoc.json  apidoc的配置文件
   ├── package.json
   └── serve.js  项目入口文件
   ```

#### 安装教程

```javascript
//查看源
npm config get registry
//更换源
npm config set registry https://registry.npmjs.org
//淘宝源
npm config set registry https://registry.npm.taobao.org

npm install
```



#### 使用说明

1.  启动mongoDB
2.  将sql文件夹下json导入mongoDB的expressdbs数据库
3.  npm run dev 启动，默认6166端口
4.  npm run doc 生成接口文档，放于apidoc文件夹（如要使用apidoc，需全局安装npm install apidoc -g）
