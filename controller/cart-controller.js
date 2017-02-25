const async = require('async');

const Cart = require('../model/cart');
const constant = require('../config/constant');

const mapItemToUri = (items)=> {
  return items.map(({item, count})=> {
    return {uri: `items/${item}`, count};
  })
};

class CartController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Cart.find({},(err,docs)=>{
          let carts = docs.map((doc) => {
            let cart = doc.toJSON();
            cart.items = mapItemToUri(cart.items);
            return cart;
          });
          done(null, carts);
        });
      },
      totalCount: (done)=> {
        Cart.count(done);
      }

    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    Cart.findById(req.params.cartId)
      .exec((err, doc)=> {
        if (err) {
          return next(err);
        }
        if (!doc) {
          return res.sendStatus(constant.httpCode.NOT_FOUND);
        }
        let data = doc.toJSON();
        let items = doc.items;
        data.items = mapItemToUri(items);

        return res.status(constant.httpCode.OK).send(data);
      })
  }

  create(req, res, next) {
    Cart.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `carts/${doc._id}`})
    })
  }

  update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.cartId, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.status(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.NO_CONTENT);
    })
  }

  delete(req, res, next) {
    Cart.findByIdAndRemove(req.params.cartId, (err, doc)=> {
      if (!doc) {
        return res.status(constant.httpCode.NO_CONTENT);
      }
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.NO_CONTENT);
    })
  }
}

module.exports = CartController;
