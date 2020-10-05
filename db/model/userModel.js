const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  us:  {type:String,required:true},
  ps: {type:String,required:true},
  age:   Number,
  sex:  {type:Number,default:0}
});

var User = mongoose.model('user', userSchema);

module.exports = User;