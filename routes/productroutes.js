const router = require("express").Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Add product
router.post("/", auth, role("admin"), async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

// Update
router.put("/:id", auth, role("admin"), async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
