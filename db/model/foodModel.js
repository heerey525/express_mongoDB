const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({
  name:  {type:String,required:true}, // 名称
  price: {type:String,required:true}, // 价格
  desc: {type:String,required:true}, // 描述
  typeid: {type:Number,required:true}, // 类别
  img: {type:String,required:true} // 图片
},
{ timestamps: {createdAt: 'created', updatedAt: 'updated'} });

var Food = mongoose.model('foods', foodSchema);

module.exports = Food;