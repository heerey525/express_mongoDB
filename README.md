# Node后台管理系统

#### 介绍
express+mongoDB的一套后台管理系统后端部分，前端部分（[vue后台管理系统](https://github.com/heerey525/express_mongodb_web)）

gitee地址有[提交记录](https://gitee.com/hlshare/express_mongoDB/commits/master)

#### 软件架构
1. 基于express+mongoDB实现的一套后台管理系统，功能点有：

邮箱验证、注册、登录、jwt验证、用户管理、权限列表、角色列表、商品的增删改查、国际化管理（增删改查、批量添加、excel导入导出、导出js文件）、图片上传等

`由于是开源项目，用户密码并未加密，使用者可自行 在用户新增接口进行密码加密入库`
`在一般业务中，删除操作为逻辑删除，即变更数据库数据状态而非真实删除，查询时根据非删除状态查询`

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
   ```sh
   .
   ├── apidoc                   # 命令生成的接口文档
   ├── db                       # 数据库相关
         ├── model              # 定义表结构
         └── connect.js         # 连接数据库
   ├── output                   # 导出多语言JS临时存放点（用于前端下载）
   ├── router                   # 接口路由（进行数据库CRUD）
   ├── sql                      # 本项目用到的sql文件（导入到MongoDB数据库）
         └── mongoDB命令.txt
   ├── static                   # 静态资源（暴露在外部可访问）
         ├── excel              # 导出excel临时存放点（用于前端下载）
         ├── img                # 图片资源
         └── rar                # 导出rar压缩文件临时存放点（用于前端下载）
   ├── utils                    # 公共JS方法或变量
         ├── counter.js         # 为数据库表自增id
         ├── exportXlsx.js      # 导出excel相关方法
         ├── mail.js            # 邮箱发验证码
         ├── qiniu.js           # 七牛云上传方法
         ├── rar.js             # rar压缩
         └── token.js           # 生成、验证token
   ├── 多语言文件.xlxs            # 用于测试多语言批量导入的模板
   ├── apidoc.json              # apidoc的配置文件
   ├── package.json
   └── serve.js                 # 项目入口文件
   ```
6. 


#### 安装教程
```sh
# 查看源
npm config get registry
# 更换源
npm config set registry https://registry.npmjs.org
# 淘宝源
npm config set registry https://registry.npm.taobao.org

npm install
```
#### 使用说明

1. 启动`mongoDB`

2. 将sql文件夹下`json`导入`mongoDB`的`expressdbs`数据库

3. `npm run dev` 启动，默认6166端口

4. `npm run doc` 生成接口文档，放于apidoc文件夹（如要使用`apidoc`，需全局安装`npm install apidoc -g`）

5. 部署到服务器推荐使用pm2

   eg. 运行

   ```javascript
   D:\Projects\node\gitee\express_mongoDB>pm2 start serve.js --name express_mongoDB
   ```

   ```sh
   # pm2 命令如下
   npm install pm2 -g                     # 命令行安装 pm2 
   pm2 list                               # 显示所有进程状态
   pm2 start serve.js --name my-api       # 命名进程并运行（在该项目目录下创建别名my-api并运行serve.js）
   pm2 stop 0                             # （通过id）停止指定的进程（0是id）
   pm2 stop my-api                        # （通过别名）停止指定的进程（my-api是别名）
   pm2 restart 0                          # 重启指定的进程
   pm2 restart all                        # 重启所有进程
   pm2 stop all                           # 停止所有进程
   pm2 reload all                         # 0秒停机重载进程 (用于 NETWORKED 进程)
   pm2 logs                               # 显示所有进程日志
   pm2 monit                              # 监视所有进程
   pm2 startup                            # 产生 init 脚本 保持进程活着
   pm2 delete 0                           # 杀死指定的进程
   pm2 delete all                         # 杀死全部进程
   ```

   
