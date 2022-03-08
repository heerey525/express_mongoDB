const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permitSchema = new Schema({
  id:  {type:Number,default:1}, // 权限自增id
  fid: {type:Number,required:true}, // 权限父级id
  name: {type:String,required:true}, // 权限名称
  path: {type:String,required:true}, // 权限路径
  sort: {type:Number,default:0}, // 排序
  mark: String, // 权限标识
  level: {type:Number,required:true}, // 权限层级 0-一级菜单 1-二级菜单 2-操作
});

var Permit = mongoose.model('permits', permitSchema);

module.exports = Permit;