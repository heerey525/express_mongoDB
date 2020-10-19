const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  us:  {type:String,required:true}, // 账号（邮箱）
  ps: {type:String,required:true}, // 密码（未加密）
  time: {type:Number,required:true}, // 创建时间
  age: Number, // 年龄
  roleId: {type:Number,default:1}, // 绑定的角色id
  state: {type:Number,default:1}, // 是否启用
  sex:  {type:Number,default:0}, // 性别
  id: {type:Number,default:1} // id
});

var User = mongoose.model('users', userSchema);

module.exports = User;