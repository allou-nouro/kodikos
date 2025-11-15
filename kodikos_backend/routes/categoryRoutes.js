const express = require('express');
const router = express.Router();

// get category controll 

const {
    addCategory,
  getCategory,
  deleteCategory,
}=require("../controllers/CategoryControl");

// انشاء صنف
router.post("/:id",addCategory)
// جلب المنتاج عن طريق الصنف 
router.get("/:name",getCategory) 
// حذف الصنف 
router.delete("/:id",deleteCategory)

module.exports = router;

