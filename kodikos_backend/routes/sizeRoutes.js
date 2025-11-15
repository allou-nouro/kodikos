const express = require("express");
const router = express.Router();

const { 
    addSize,
    deleteSize,
 } = require("../controllers/sizeControll");
const verifyToken = require("../middleware/verifyToken");

// إضافة مقاس لمنتج محدد
// معرف المنتح 
router.post("/:id", verifyToken, addSize);
router.delete("/sizeId",verifyToken,deleteSize)
module.exports = router;
