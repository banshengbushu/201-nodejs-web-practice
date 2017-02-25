const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemController = new Schema ({
  name:String,
  price:String,
  category:{
    type:Schema.ObjectId,
    ref:'Category'
  }
});

const Item = mongoose.model('Item', ItemController);

module.exports = Item;
