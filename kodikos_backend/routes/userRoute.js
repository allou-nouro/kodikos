const express = require('express');
const router = express.Router();
const upload=require("../middleware/upload");

const {
    createOwner,
    login,
    updateInfoOwner,
    updatePassword,
    infOwner
}=require("../controllers/userControll")

router.post("/register",upload.single("image"),createOwner)
router.post("/login",login)

module.exports=router