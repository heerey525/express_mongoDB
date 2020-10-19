const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({
  name:  {type:String,required:true}, // 名称
  price: {type:String,required:true}, // 价格
  desc: {type:String,required:true}, // 描述
  // typename: {type:String,required:true},
  typeid: {type:Number,required:true}, // 类别
  img: {type:String,required:true} // 图片
});

var Food = mongoose.model('foods', foodSchema);

module.exports = Food;