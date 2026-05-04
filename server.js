require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100;
});
app.use(limiter);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));