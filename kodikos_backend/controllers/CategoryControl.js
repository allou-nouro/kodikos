const asyncHandler = require("express-async-handler");
const Category = require("../model/categoryRealModel");

// ✅ Get product par category
// Route --> GET /api/category/:name
const getCategory = asyncHandler(async (req, res) => {
  const categoryName=req.params.name
  const category = await Category.find({name:categoryName}).populate('productId',"name price product_image description");

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json(category);
});

// ✅ added category 
// Route --> POST /api/category/:id
//*** / id for product ***
const addCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryName } = req.body;

    const newCategory = new Category({
      name: categoryName,
      productId: req.params.id
    });

    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});



// ✅ Delete category
// Route --> DELETE /api/category/:id
// ****id for category ****
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category deleted successfully" });
});

module.exports = {
  addCategory,
  getCategory,
  deleteCategory,
};
