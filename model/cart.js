const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartController = new Schema({
  uerId: String,
  items: {
    item: [{
      type: Schema.ObjectId,
      ref: 'Item'
    }
    ],
    count: Number
  }
});

const Cart = mongoose.model('Cart', CartController);

module.exports = Cart;
