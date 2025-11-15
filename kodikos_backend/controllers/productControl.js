const asyncHandler = require("express-async-handler");
const Product = require("../model/ProductModel")
const Category = require('../model/categoryRealModel')
const Size=require("../model/sizeModel")
const Color=require("../model/colorModel")
const deleteImage=require("../middleware/deleteImage")
// Get all Product 
// Route --> GET /api/Product
const getProducts = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // الصفحة الحالية
    const limit = parseInt(req.query.limit) || 10; // عدد العناصر في الصفحة
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
    
const listProducts = await Promise.all(
  products.map(async (product) => {
    const listCategory = await Category
      .find({ productId: product._id })
      .select("-productId -_id -__v");
      const onlyNames = listCategory.map(c => c.name);

    return { product, listCategory:onlyNames };
  })
);

    res.status(200).json({
    total,
    page,
    totalPages: Math.ceil(total / limit),
    count: products.length,
    listProducts
    });
  } catch (error) {
    res.status(500).json({ msg: "cannot get the information!!", error });
  }
});

// Create new product 
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, description,type,size,colors ,quality} = req.body;
  if (!req.user){
    return res.status(404).json({msj:"owner not found"})
  }
  if (!name || !price ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("uploaded file:", req.files);

  let imageUrl = [];
  if (req.files) {
    imageUrl = req.files.map((file)=>file.path); 
  } else {
    return res.status(400).json({ message: "Please add the product image" });
  }

  // إنشاء المنتج
  const pro = await Product.create({
    type,
    name,
    price,
    description,
    product_image: imageUrl,
    quality,
    userId:req.user.id
  });
  // creat categorys
  for (let oneCategory of category) {
    const catego = new Category({ name: oneCategory, productId: pro._id });
    await catego.save();
  }
  // creat size
  for (let oneSize of size) {
    const newSize = new Size({ name: oneSize.name.toLowerCase(), productId: pro._id,quantity:oneSize.quantity });
    await newSize.save();
  }
  // creat color
    for (let oneColor of colors) {
    const newColor = new Color({ name: oneColor, productId: pro._id });
    await newColor.save();
  }


  res.status(201).json({ pro, category,size,colors });
});

// Get a product 
// Route --> GET /api/product/:id
const getProduct = asyncHandler(async (req, res) => {
    const Pro = await Product.findById(req.params.id);
    if (!Pro) {
        res.status(404);
        throw new Error('Product not found');
    }
    const listCategory=await Category.find({productId:req.params.id}).select("-productId -_id -__v");
    const categoryNames = listCategory.map(c => c.name);
    

    res.status(200).json({Pro,categoryNames});

});

// Update a product
// Route --> PUT /api/product/:id
const updateProduct = asyncHandler(async (req, res) => {
  if (!req.user){
    return res.status(404).json({msj:"owner not found"})
  }
    const Pro = await Product.findById(req.params.id);
    if (!Pro) {
        res.status(404);
        throw new Error ('Product not found');
    }
    if (req.body.name){Pro.name=req.body.name}
    if (req.body.price){Pro.name=req.body.price}
    if (req.body.description){Pro.name=req.body.description}
    if (req.body.type){Pro.name=req.body.type}
    await Pro.save()

    res.status(200).json(Pro);
});

// add image 
const addProductImage=asyncHandler(async(req,res)=>{
  try {
    if (!req.user){
    return res.status(404).json({msj:"owner not found"})
  }
      const thisProduct= await Product.findById(req.params.id)
      if (!thisProduct){
          res.status(404).json({msj:"product not found"})
      }
      thisProduct.product_image=[req.file.path,...thisProduct.product_image]
      await thisProduct.save()
      res.status(201).json({msj:"added image seccs",thisProduct})
  }catch (err){
    res.status(500).json({ message: err.message });
  }
})
// delete image 
const deleteProductImage=asyncHandler(async(req,res)=>{
  try {
    if (!req.user){
    return res.status(404).json({msj:"owner not found"})
  }
    const {pathImage}=req.body
    const thisProduct= await Product.findById(req.params.id)
    if (!thisProduct){
          res.status(404).json({msj:"product not found"})
    }
    thisProduct.product_image=thisProduct.product_image.filter(e=>e !==pathImage)
    await deleteImage(pathImage)
    await thisProduct.save()
    res.status(201).json({msj:"delete image seccs",thisProduct})
  }catch (err){
    res.status(500).json({ message: err.message });
  }
})

// Delete a product 
// Route --> DELETE /api/product/:id
const deleteProduct = asyncHandler(async (req, res) => {
  if (!req.user){
    return res.status(404).json({msj:"owner not found"})
  }
    const pro = await Product.findById(req.params.id);
    if (!pro) {
        res.status(404);
        throw new Error ('product not found');
    }
    const oldImages=pro.product_image
      for (let oneImage of oldImages){
        deleteImage(oneImage)
      }
      await Size.deleteMany({ productId: pro._id });
      await Color.deleteMany({productId:pro._id});
      await Category.deleteMany({ productId: pro._id });
      await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(pro);
});


module.exports = { 
    getProducts, 
    createProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct,
    deleteProductImage,
    addProductImage
};
