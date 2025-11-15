const cloudinary = require("cloudinary").v2;

// ✅ إعداد Cloudinary (مرة واحدة فقط)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/**
 * تحذف صورة من Cloudinary اعتمادًا على الرابط فقط.
 * @param {string} imageUrl - رابط الصورة الكامل من Cloudinary
 * @returns {Promise<boolean>} - ترجع true إذا تم الحذف بنجاح، false إذا فشل.
 */
async function deleteFromCloudinary(imageUrl) {
  try {
    if (!imageUrl) return false;

    // 🧩 استخراج الـ public_id من الرابط
    // مثال: https://res.cloudinary.com/your_cloud_name/image/upload/v1728308430/products/abc123.jpg
    const parts = imageUrl.split("/upload/");
    if (parts.length < 2) return false;

    // الجزء بعد upload/
    let publicIdWithVersion = parts[1];
    // إزالة رقم الإصدار v + رقم
    publicIdWithVersion = publicIdWithVersion.replace(/v\d+\//, "");
    // إزالة الامتداد (.jpg أو .png ...)
    const publicId = publicIdWithVersion.split(".")[0];

    // 🗑️ حذف الصورة من Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("🗑️ Cloudinary delete result:", result);

    return result.result === "ok";
  } catch (error) {
    console.error("❌ Error deleting from Cloudinary:", error);
    return false;
  }
}

module.exports = deleteFromCloudinary;
