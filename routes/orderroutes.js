const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const calculateTotal = require("../utils/calculateTotal");

// Place Order
router.post("/", auth, async (req, res) => {
  try {
    const total = await calculateTotal(req.body.products);

    // reduce stock
    for (let item of req.body.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    const order = new Order({
      userId: req.user.id,
      products: req.body.products,
      totalAmount: total
    });

    await order.save();
    res.send(order);

  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get user orders
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.send(orders);
});

module.exports = router;