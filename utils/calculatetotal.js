const Product = require("../models/product");

async function calculateTotal(products) {
  let total = 0;

  for (let item of products) {
    const product = await Product.findById(item.productId);

    if (!product || product.stock < item.quantity)
      throw new Error("Out of stock");

    total += product.price * item.quantity;
  }

  return total;
}

module.exports = calculateTotal;
