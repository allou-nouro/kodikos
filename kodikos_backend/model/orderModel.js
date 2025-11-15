const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name:String,
    phone:Number,
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    quantity:Number,
    price:Number,       // السعر لكل وحدة (نضيفه لحساب الإيرادات)
    isConfirm:Boolean,
    createdAt: { type: Date, default: Date.now } // نضيف تاريخ الطلب
});

module.exports = mongoose.model('Order', orderSchema);
