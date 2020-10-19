const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
  roleId: {type:Number,default:1}, // 角色id
  roleName: {type:String,required:true}, // 角色名称
  authIds: String, // 具有的权限id的结合
  handle: String, // 操作
  roleDesc: {type:String,required:true}, // 角色描述
});

var Role = mongoose.model('roles', roleSchema);

module.exports = Role;