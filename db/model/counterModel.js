const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
  _id: { type: String, required: true }, // 表格名称
  seq: { type: Number, default: 0 } // 自增计数器
});

var Counter = mongoose.model('counters', counterSchema);

module.exports = Counter;