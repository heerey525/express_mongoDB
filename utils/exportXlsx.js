//dlXlsx.js
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

// 导出xlsx
function dlXlsx(_data) {
  const goods = _data
  let temp = new Promise(function (resolve, reject) {
    let sheet1data = [],
      map1 = {}
    // if (!goods.length) {
    //     reject('导出数据为空')
    // }

    goods.map((item) => {
      map1['变量'] = item.key
      map1['中文'] = item['zh-CN']
      map1['解释中文'] = item.notice
      map1['英文'] = item['en-US']
      map1['越南语'] = item['vi-VN']
      map1['泰语'] = item['th-TH']
      map1['印度语'] = item['en-IN']
      sheet1data.push(map1)
      map1 = {}
    })
    var sheet1 = XLSX.utils.json_to_sheet(sheet1data)

    /* create a new blank workbook */
    var wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, sheet1, '多语言模块')

    var wopts = {
      // 要生成的文件类型
      bookType: 'xlsx',
      // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      bookSST: false,
      type: 'binary',
    }
    // var wbout = XLSX.write(workbook, wopts)
    resolve(XLSX.writeFile(wb, '多语言文件.xlsx', wopts))
  })
  return temp
}
// 保存js
function dlJs(name, _data) {
  let temp = new Promise(function (resolve, reject) {
    const list = new Uint8Array(
      Buffer.from('export default ' + JSON.stringify(_data))
    )
    fs.writeFile('output/'+name + '.js', list, (err) => {
      if (err) throw err
      console.log(name + '.js已被保存')
      resolve('成功')
    })
  })
  return temp
}
// 导出js的zip文件
function dlZip(name, _data) {
    let temp = new Promise(function (resolve, reject) {
        const output = fs.createWriteStream('多语言文件.zip')
        const archive = archiver('zip')

        // 文件输出流结束
        output.on('close', function () {
          console.log(`总共 ${archive.pointer()} 字节`)
          console.log('archiver完成文件的归档，文件输出流描述符已关闭')
        })
        // 数据源是否耗尽
        output.on('end', function () {
          console.log('数据源已耗尽')
        })
        // 存档警告
        archive.on('warning', function (err) {
          if (err.code === 'ENOENT') {
            console.warn('stat故障和其他非阻塞错误')
          } else {
            throw err
          }
        })
        // 存档出错
        archive.on('error', function (err) {
          throw err
        })
        // 通过管道方法将输出流存档到文件
        archive.pipe(output)
        // 追加一个文件
        archive.file('output/zh-CN.js', { name: 'zh-CN.js' })
        archive.file('output/notice.js', { name: 'notice.js' })
        archive.file('output/en-US.js', { name: 'en-US.js' })
        archive.file('output/vi-VN.js', { name: 'vi-VN.js' })
        archive.file('output/th-TH.js', { name: 'th-TH.js' })
        archive.file('output/en-IN.js', { name: 'en-IN.js' })
        //完成归档
        archive.finalize()
        resolve('ok')
    })
    return temp
  }

module.exports = { dlXlsx, dlJs, dlZip }
