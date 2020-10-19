const mongoose = require('mongoose')
var Schema = mongoose.Schema

var langSchema = new Schema({
  key: { type: String, required: true }, // 变量名
  'zh-CN': { type: String, required: true }, // 中文
  'notice': { type: String, required: true }, // 解释中文
  'en-US': { type: String, required: true }, // 英文
  'vi-VN': { type: String, required: true }, // 越南语
  'th-TH': { type: String, required: true }, // 泰语
  'en-IN': { type: String, required: true }, // 印度语
})

var Lang = mongoose.model('langs', langSchema)

module.exports = Lang
