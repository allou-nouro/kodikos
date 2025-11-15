const express = require('express');
const router = express.Router();

// استدعاء الدوال من الكنترولر
const { 
    getProducts, 
    createProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct,
    deleteProductImage,
    addProductImage
} = require('../controllers/productControl');

const upload=require("../middleware/upload");
const verifyToken = require('../middleware/verifyToken');

// تعريف المسارات (Routes)

// جلب كل المنتجات
router.get('/', getProducts);

// جلب منتج واحد حسب id
router.get('/:id', getProduct);

// إنشاء منتج جديد
router.post('/', upload.array("image",5),verifyToken, createProduct);

// تحديث منتج
router.put('/:id',upload.array("image",5),verifyToken, updateProduct);

// حذف منتج
router.delete('/:id',verifyToken, deleteProduct);

// اضافة الصورة 
router.patch('/:id',upload.array("image",5),verifyToken,addProductImage)
//حذف الصورة 
router.options("/:id",verifyToken,deleteProductImage)

// تصدير الراوتر لاستخدامه في market.js
module.exports = router;
