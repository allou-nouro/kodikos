const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the product name"],
    },
    price: {
      type: Number, // ✅ الرقم أفضل للحسابات
      required: [true, "Please add the product price"],
    },
    description: {
      type: String,
      required: false,
    },
    product_image: {
      type: [String], // مصفوفة من روابط الصور
      required: [true, "Please add the product image"],
    },
    type: String,
    quality: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // ✅ هنا تضع timestamps
);

module.exports = mongoose.model("Product", productSchema);
