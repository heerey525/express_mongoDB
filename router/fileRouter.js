const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const Lang = require('../db/model/langModel')
const { rarcp, clearFile, clearRar, downLoadFile } = require('../utils/rar');

const { upload_file } = require('./../utils/qiniu')

// 解析excel文件
function parseExcel(filename) {
  let temp = new Promise(function (resolve, reject) {
    const workbook = xlsx.readFile('./static/excel/' + filename) // 读取excel文件
    const sheetNames = workbook.SheetNames //获取表名称数组

    // 可以做一个判断验证excel转换的json是否是后端需要的
    // reject('文件格式不对')
    let _this = []
    for (let i = 0; i < sheetNames.length; i++) {
      let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[i]]) //通过工具将表对象的数据读出来并转成json
      // console.log('-----', data)
      data.map((item, index) => {
        // 这里根据具体业务来进行操作
        _this.push({
          key: item['变量'],
          'zh-CN': item['中文'],
          notice: item['解释中文'],
          'en-US': item['英文'],
          'vi-VN': item['越南语'],
          'th-TH': item['泰语'],
          'en-IN': item['印度语'],
        })
      })
    }
    resolve(_this)
  })
  return temp
}

//读取某个路径下所有文件名
// var readDir = fs.readdirSync("./import");
// readDir.forEach(function (filename) {
//     let fileExtension = filename.split('.').pop().toLowerCase();
//     if(fileExtension === 'xlsx' || fileExtension === 'xls' ){
//         // 批量解析文件
//         parseExcel(filename)
//     }
// })

// storage
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
var storage = multer.diskStorage({
  // destination是用来确定上传的文件应该存储在哪个文件夹中
  destination: function (req, file, cb) {
    cb(null, './static/img')
  },
  // filename 用于确定文件夹中的文件名的确定
  filename: function (req, file, cb) {
    const timestamp = Date.now().toString()
    const randomNum = parseInt(Math.random() * 9999).toString()
    const suffix = file.originalname.split('.')[
      file.originalname.split('.').length - 1
    ]
    cb(null, `${timestamp}${randomNum}.${suffix}`)
  },
})

var upload = multer({ storage: storage }).single('avatar')

// storage
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
var qiniuStorage = multer.diskStorage({
  // destination是用来确定上传的文件应该存储在哪个文件夹中
  destination: function (req, file, cb) {
    cb(null, './static/qiniu')
  },
  // filename 用于确定文件夹中的文件名的确定
  filename: function (req, file, cb) {
    // const timestamp = Date.now().toString()
    // const randomNum = parseInt(Math.random() * 9999).toString()
    const suffix = file.originalname.split('.')[
      file.originalname.split('.').length - 1
    ]
    cb(null, `temp.${suffix}`)
  },
})

var qiniuUpload = multer({ storage: qiniuStorage }).single('avatar')

// storage
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
var excelstorage = multer.diskStorage({
  // destination是用来确定上传的文件应该存储在哪个文件夹中
  destination: function (req, file, cb) {
    cb(null, './static/excel')
  },
  // filename 用于确定文件夹中的文件名的确定
  filename: function (req, file, cb) {
    const timestamp = Date.now().toString()
    const randomNum = parseInt(Math.random() * 9999).toString()
    const suffix = file.originalname.split('.')[
      file.originalname.split('.').length - 1
    ]
    cb(null, `${timestamp}${randomNum}.${suffix}`)
  },
})

var excel = multer({ storage: excelstorage }).single('avatar')

/**
 * @api {post} /file/upload 图片上传
 * @apiName 图片上传
 * @apiGroup File
 *
 * @apiParam {String} avatar 上传文件
 */
router.post('/qiniuUpload', qiniuUpload, (req, res) => {
  const { size, mimetype, filename, destination, originalname } = req.file
  if (!filename) return res.send({ code: 500, msg: '参数错误，上传失败' })

  const fileTypeList = ['jpg', 'jpeg', 'gif', 'png']
  if (size > 512000) {
    return res.send({ code: 500, msg: '上传文件太大' })
  } else if (fileTypeList.indexOf(mimetype.split('/')[1]) === -1) {
    return res.send({ code: 500, msg: '文件格式不正确' })
  }

  const timestamp = Date.now().toString()
  const randomNum = parseInt(Math.random() * 9999).toString()
  const suffix = originalname.split('.')[
    originalname.split('.').length - 1
  ]
  const file_name = `${timestamp}${randomNum}.${suffix}`
  const file_path = `./static/qiniu/${filename}`

  upload_file(file_name, file_path)
    .then(data => {
      res.send({ code: 200, data, msg: '上传成功' })
    })
    .catch(err => {
      res.send({ code: 500, msg: '上传失败' })
    })
  
})
/**
 * @api {post} /file/upload 图片上传
 * @apiName 图片上传
 * @apiGroup File
 *
 * @apiParam {String} avatar 上传文件
 */
router.post('/upload', upload, (req, res) => {
  const { size, mimetype, filename, destination } = req.file
  const fileTypeList = ['jpg', 'jpeg', 'gif', 'png']
  if (size > 512000) {
    return res.send({ code: 500, msg: '上传文件太大' })
  } else if (fileTypeList.indexOf(mimetype.split('/')[1]) === -1) {
    return res.send({ code: 500, msg: '文件格式不正确' })
  }
  res.send({
    code: 200,
    imgUrl: destination.substring(1) + '/' + filename,
    msg: '上传成功',
  })
})
/**
 * @api {post} /file/excel/import 多语言批量添加
 * @apiName 多语言批量添加
 * @apiGroup Lang
 *
 * @apiParam {String} avatar excel文件（中文 解释中文 英语 越南语 泰语 印度语）
 */
router.post('/excel/import', excel, (req, res) => {
  parseExcel(req.file.filename)
    .then((data) => {
      // const temp = []
      // data.map((item, index) => {
      //   if (Lang.find({ key: item.key })) {
      //     temp.push(item)
      //     data.splice(index, 1)
      //   }
      // })
      // console.log('data', data, 'temp', temp)
      Lang.insertMany(data)
      // res.send({ code: 200, msg: '添加成功' })
    })
    .then(data => {
      res.send({ code: 200, msg: '添加成功' })
    })
    .catch((err) => {
      res.send({ code: 500, msg: '失败' })
    })
  // const { size, mimetype, filename, destination } = req.file;
  // const fileTypeList = ['jpg', 'jpeg', 'gif', 'png']
  // if (size > 512000) {
  //     return res.send({ code: 500, msg: '上传文件太大'})
  // } else if (fileTypeList.indexOf(mimetype.split('/')[1]) === -1) {
  //     return res.send({ code: 500, msg: '文件格式不正确' })
  // }
  // res.send({ code: 200, imgUrl: destination.substring(1)+'/'+filename, msg: '上传成功' })
})

// storage
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
var storagerar = multer.diskStorage({
    // destination是用来确定上传的文件应该存储在哪个文件夹中
    destination: function (req, file, cb) {
      cb(null, './static/rar')
    },
    // filename 用于确定文件夹中的文件名的确定
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
    },
  })
  
  var uploadrar = multer({ storage: storagerar }).array('avatar')
/**
 * @api {post} /file/uploadrar 文件上传压缩(支持多个视频或图片，其他未测)
 * @apiName 文件上传压缩
 * @apiGroup File
 *
 * @apiParam {String} avatar 被压缩文件
 */
router.post('/uploadrar', (req, res) => {
    // 上传前先清除
    clearFile('D:\\myPractice\\node\\express_mongoDB\\static\\rar', 'static/rar')
    .then(() => {
        // 然后上传
        uploadrar(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // 发生错误
                res.send({ code: 500, msg: err })
            } else if (err) {
                // 发生错误
                res.send({ code: 500, msg: err })
            }
                
            // 一切都好
            rarcp('D:/myPractice/node/express_mongoDB/压缩文件.rar','D:/myPractice/node/express_mongoDB/static/rar', () => {
                res.send({ code: 200, msg: '上传成功' })
            })
        })
    })
    .catch(err => {
        res.send({ code: 500, msg: err })
    })
})
/**
 * @api {post} /file/downloadrar 压缩文件下载
 * @apiName 压缩文件下载
 * @apiGroup File
 *
 */
router.get('/downloadrar', (req, res) => {
    if (downLoadFile('压缩文件.rar')) {
        res.download('压缩文件.rar')
    } else {
        res.send({ code: 500, msg: '请先上传文件'})
    }
})
/**
 * @api {post} /file/downloadrar 手动清除服务器生成的压缩文件（防止别人下载）
 * @apiName 压缩文件下载
 * @apiGroup File
 *
 */
router.get('/downloadrar/remove', (req, res) => {
    clearRar('D:/myPractice/node/express_mongoDB/压缩文件.rar')
    res.send({ code: 200, msg: '删除成功' })
})

module.exports = router