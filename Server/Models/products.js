const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productCode: { type: String, required: true, unique: true },
  hsn: { type: String, required: true },
  salesPrice: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
