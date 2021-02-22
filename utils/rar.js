const cp = require('child_process')
const fs = require('fs')
const path = require('path')
let fileUrl = 'D:\\myPractice\\node\\express_mongoDB\\static\\rar'

// 用WinRAR指令进行rar压缩 rarFile-压缩后的地址 isRarFile-被压缩的地址
function rarcp(rarFile, isRarFile, callback) {
    clearRar(rarFile)
  cp.exec(
    '"C:\\Program Files\\WinRAR\\WinRAR.exe" a -ep ' +
      rarFile +
      ' ' +
      isRarFile,
    { encoding: 'binary' },
    callback
  )
}
// 清除压缩文件 pathUrl文件地址
function clearFile(pathUrl, addPathUrl) {
  /**
   * 判断给定的路径是否存在
   */
  return new Promise(function (resolve, reject) {
    const url = pathUrl
    function recursionClearFile(url) {
      let files = []
      if (fs.existsSync(url)) {
        /**
         * 返回文件和子目录的数组
         */
        files = fs.readdirSync(url)
        files.forEach(function (file, index) {
          const curPath = path.join(url, file)
          console.log(curPath)
          /**
           * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
           */
        //   if (fs.statSync(curPath).isDirectory()) {
        //     // recurse
        //     recursionClearFile(curPath)
        //   } else {
        //     // 删除文件
        //     fs.unlinkSync(curPath)
        //   }
            // 本例中不包含文件夹内不包含文件夹，故不需要判断进行递归
          fs.unlinkSync(curPath)
        })
        /**
         * 清除文件夹
         */
        // 本例中不包含文件夹内不包含文件夹，故不需要判断进行递归 不需要删除文件夹
        // fs.rmdirSync(url)
      } else {
        console.log('给定的路径不存在，请给出正确的路径')
        reject('error')
      }
    }
    recursionClearFile(url)
    // 创建文件夹 该操作可能存在失败，因为权限不够，需以管理员身份运行
    // 本例中不包含文件夹内不包含文件夹，故不需要判断进行递归 不需要删除文件夹 更不需要创建文件夹
    // fs.mkdirSync(addPathUrl, '0777')
    resolve('success')
  })
}
// 手动清除服务器生成的压缩文件（防止别人下载）
function clearRar(rarFile){
    if (fs.existsSync(rarFile)) {
        fs.unlinkSync(rarFile)
    }
}
// 下载压缩文件
function downLoadFile(file){
    return !!fs.existsSync(file)
}

module.exports = { rarcp, clearFile, clearRar, downLoadFile }
