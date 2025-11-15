const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // بدون unique
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
});
module.exports = mongoose.model("Categorys", categorySchema);
