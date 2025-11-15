const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
console.log("✅ Cloudinary connected:", cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "articles",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    resource_type: "auto",
    transformation: [{ width: 500, height: 500, crop: "limit" }] // اختياري
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // يحفظ الملف باسمه الأصلي
  }
});

module.exports = { storage, cloudinary };