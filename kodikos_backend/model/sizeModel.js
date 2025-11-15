const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity:Number
});
module.exports = mongoose.model("Size", sizeSchema);