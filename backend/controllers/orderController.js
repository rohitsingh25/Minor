import asyncHandler from 'express-async-handler';
// import Product from '../../frontend/src/components/product/Product.component.jsx';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

//@desc  Create New order
//@route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    // // update stock
    // for (const item of orderItems) {
    //   console.log(item);
    //   const itemInDB = await Product.findById(item.product);
    //   console.log('itemInDB', itemInDB);

    //   itemInDB.countInStock = item.countInStock - item.quantity;
    //   itemInDB.description = itemInDB.description;
    //   itemInDB.user = itemInDB.user;
    //   console.log('b s')
    //   console.log(itemInDB);
    //   const updatedItem = await itemInDB.save();
    //   console.log('a s')
    // }
    // console.log("items", orderItems);
    // const opts = [];
    // for (const item of orderItems) {
    //   opts.push({
    //     updateOne: {
    //       filter: {"id": item._id}
    //     }
    //   })
    // }

    const bulkOps = orderItems.map(obj => {
      const updatedStock =  obj["countInStock"] - obj["quantity"];
      console.log('updatedStock', updatedStock);
      return {
        updateOne: {
          filter: {
            _id: obj.product
          },
          // If you were using the MongoDB driver directly, you'd need to do
          // `update: { $set: { field: ... } }` but mongoose adds $set for you
          update: {
            countInStock: obj["countInStock"] - obj["quantity"]
          }
        }
      }
    });
    console.log('bulkOps', bulkOps);
    
    Product.bulkWrite(bulkOps).then((res) => {
      console.log("Documents Updated", res.modifiedCount)
    });

    res.status(201).json(createdOrder);
  }
});

//@desc  get order by id
//@route GET  /api/order/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

//@desc  Update order to paid
//@route GET  /api/order/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

//@desc  Update order to Delivered
//@route GET  /api/order/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

//@desc  Update order to Delivered
//@route GET  /api/order/:id/deliver
// @access Private/Admin
const updateOrderToReturn = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isReturned = true;
    order.returnedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

//@desc  Get logged in user order
//@route GET  /api/order/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

//@desc  Get all orders
//@route GET  /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');

  res.json(orders);
});

export {
  getOrderById,
  addOrderItems,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToReturn,
};
