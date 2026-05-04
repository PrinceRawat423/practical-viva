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
  max: 100
});
app.use(limiter);
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/products", require("./routes/productroutes"));
app.use("/api/orders", require("./routes/orderroutes"));

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

async function startServer() {
  if (!process.env.MONGO_URI || process.env.MONGO_URI === "your_mongodb_url") {
    throw new Error("Set a valid MONGO_URI in .env");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  });
  console.log("DB Connected");

  app.listen(5000, () => console.log("Server running on port 5000"));
}

startServer().catch((err) => {
  console.error("Startup failed:", err.message);
  process.exit(1);
});
