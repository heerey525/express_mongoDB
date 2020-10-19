# Node后台管理系统

#### 介绍
express+mongoDB的一套后台管理系统后端部分，前端部分（[vue后台管理系统](https://gitee.com/hlshare/express_mongodb_web)）

#### 软件架构
1、基于express+mongoDB实现的一套后台管理系统，功能点有：

邮箱验证、注册、登录、jwt验证、用户管理、权限列表、角色列表、商品的增删改查、国际化管理（增删改查、批量添加、excel导入导出、导出js文件）、图片上传等

2、利用apidoc生成接口文档 [文档生成示例](http://blog.aigouzhushou.com/express_mongoDB/apidoc/)


#### 安装教程

npm install

#### 使用说明

1.  启动mongoDB
2.  将sql文件夹下json导入mongoDB的expressdbs数据库
3.  npm run dev 启动，默认6166端口
4.  npm run doc 生成接口文档，放于apidoc文件夹（如要使用apidoc，需全局安装npm install apidoc -g）
