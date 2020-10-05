const mongoose = require('mongoose')
var Schema = mongoose.Schema

var langSchema = new Schema({
  key: { type: String, required: true }, // 变量名
  'zh-CN': { type: String, required: true },
  'notice': { type: String, required: true },
  'en-US': { type: String, required: true },
  'vi-VN': { type: String, required: true },
  'th-TH': { type: String, required: true },
  'en-IN': { type: String, required: true },
})

var Lang = mongoose.model('langs', langSchema)

module.exports = Lang
