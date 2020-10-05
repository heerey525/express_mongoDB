define({ "api": [
  {
    "type": "post",
    "url": "/file/upload",
    "title": "图片上传",
    "name": "图片上传",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>上传文件</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/fileRouter.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/food/del",
    "title": "删除",
    "name": "删除",
    "group": "Food",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/foodRouter.js",
    "groupTitle": "Food"
  },
  {
    "type": "post",
    "url": "/food/update",
    "title": "商品修改",
    "name": "商品修改",
    "group": "Food",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>描述</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeid",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>图片</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/foodRouter.js",
    "groupTitle": "Food"
  },
  {
    "type": "post",
    "url": "/food/page",
    "title": "商品列表",
    "name": "商品列表",
    "group": "Food",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNo",
            "description": "<p>页数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeid",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "key",
            "description": "<p>关键字查询</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/foodRouter.js",
    "groupTitle": "Food"
  },
  {
    "type": "post",
    "url": "/food/add",
    "title": "商品添加",
    "name": "商品添加",
    "group": "Food",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>描述</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeid",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>图片</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/foodRouter.js",
    "groupTitle": "Food"
  },
  {
    "type": "post",
    "url": "/lang/update",
    "title": "修改",
    "name": "修改",
    "group": "Lang",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>变量名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zh-CN",
            "description": "<p>中文</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice",
            "description": "<p>解释中文</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "en-US",
            "description": "<p>英语</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vi-VN",
            "description": "<p>越南语</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "th-TH",
            "description": "<p>泰语</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "en-IN",
            "description": "<p>印度语</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/langRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/lang/del",
    "title": "删除",
    "name": "删除",
    "group": "Lang",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/langRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/lang/delAll",
    "title": "删除全部",
    "name": "删除全部",
    "group": "Lang",
    "version": "0.0.0",
    "filename": "router/langRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/file/excel/import",
    "title": "多语言批量添加",
    "name": "多语言批量添加",
    "group": "Lang",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>excel文件（中文 解释中文 英语 越南语 泰语 印度语）</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/fileRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/lang/add",
    "title": "多语言单个添加",
    "name": "多语言添加",
    "group": "Lang",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>变量名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zh-CN",
            "description": "<p>中文</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice",
            "description": "<p>解释中文</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "en-US",
            "description": "<p>英语</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vi-VN",
            "description": "<p>越南语</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "th-TH",
            "description": "<p>泰语</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "en-IN",
            "description": "<p>印度语</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/langRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/lang/export",
    "title": "导出excel",
    "name": "导出excel",
    "group": "Lang",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNo",
            "description": "<p>页数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "key",
            "description": "<p>关键字查询</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/langRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/lang/export/js",
    "title": "导出js文件",
    "name": "导出js文件",
    "group": "Lang",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNo",
            "description": "<p>页数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "key",
            "description": "<p>关键字查询</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/langRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/lang/page",
    "title": "查询",
    "name": "查询",
    "group": "Lang",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNo",
            "description": "<p>页数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "key",
            "description": "<p>关键字查询</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/langRouter.js",
    "groupTitle": "Lang"
  },
  {
    "type": "post",
    "url": "/user/reg",
    "title": "用户注册",
    "name": "用户注册",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "us",
            "description": "<p>用户名（邮箱）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ps",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"msg\": \"创建成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/userRouter.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "用户登录",
    "name": "用户登录",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "us",
            "description": "<p>用户名（邮箱）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ps",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"msg\": \"登录成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/userRouter.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/getMailCode",
    "title": "获取邮箱验证码",
    "name": "获取邮箱验证码",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>用户名（邮箱）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"msg\": \"邮箱验证码发送成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": \"500\",\n  \"msg\": \"邮箱验证码发送失败\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/userRouter.js",
    "groupTitle": "User"
  }
] });