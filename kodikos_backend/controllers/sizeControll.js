const asyncHandler = require("express-async-handler");
const Size=require("../model/sizeModel")
//اضافة مقاس للمنتج 
const addSize=asyncHandler(async(req,res)=>{
    try {
        const {size,quantity}=req.body
        const {id}=req.params
        newSize=new Size({
            name:size.toLowerCase(),
            quantity,
            productId:id
        })
        newSize.save()
        res.status(200).json({msj:"added size secc",newSize})
    }catch (err) {
    res.status(500).json({ msg: err.message });
  }
})
// حذف من المنتج 
const deleteSize=asyncHandler(async(req,res)=>{
    try {
        const {sizeId}=req.params
        const deleteSize=await Size.findByIdAndDelete(sizeId)
        res.status.json({msj:"delete size secc ",deleteSize})
    }catch (err) {
    res.status(500).json({ msg: err.message });
    }
})
// تعديل على مقاس المنتج
const updateSize=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const thisSize=await Size.findById(id)
        if (!thisSize){
            return res.status(400).json({msj:"size not found"})
        }
        thisSize.quantity=req.body.quantity
    }catch (err) {
    res.status(500).json({ msg: err.message });
    }
})

// جلب مقاسات المنتج 
const getProductSize=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const allSize=await Size.find({productId:id})
        res.status(400).json(allSize)
    }catch (err) {
    res.status(500).json({ msg: err.message });
    }
})

// البحث عن طريق المقاس

const searchParSize=asyncHandler(async(req,res)=>{
    try {
        const allProduct=await Size.find({name:req.body.sizeName}).populate("productId","name price product_image")
        res.status(200).json(allProduct)
    }catch (err) {
    res.status(500).json({ msg: err.message });
    }
})

module.exports={
    addSize,
    deleteSize,
    updateSize,
    searchParSize
}
