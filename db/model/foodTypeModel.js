const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodTypeSchema = new Schema({
  name:  {type:String,required:true}, // 名称
  createTime: {type:Date,required:true}, // 创建时间
  typeid: {type:Number,default:1}, // 类别
});

var FoodType = mongoose.model('foodtypes', foodTypeSchema);

module.exports = FoodType;