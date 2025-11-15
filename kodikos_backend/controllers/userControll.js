const asyncHandler = require("express-async-handler");
const Owner= require("../model/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const deleteImage=require('../middleware/deleteImage')

// انشاء حساب واحد 
const createOwner = asyncHandler(async (req, res) => {
  try {

    // استخراج البيانات من الطلب
    const { phone, email, name, password } = req.body;

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    const thisUser=await Owner.findOne({email})
    if (thisUser) {
      return res.status(400).json({msj:"email exist"})
    }

    // إنشاء المالك الجديد
    const newOwner = new Owner({
      name,
      email,
      phone_number: phone,
      password: hashedPassword,
      profile_image: req.file?.path, // تأكد من استخدام path الصحيح
    });

    await newOwner.save();
        const token = jwt.sign(
      { id: newOwner._id, name: newOwner.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({ msg: "Account created successfully",token,newOwner });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// تسجيل الدخول 

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const thisOwner = await Owner.findOne({ email });
    if (!thisOwner) {
      return res.status(404).json({ msj: "owner not found" });
    }

    // 2️⃣ التحقق من كلمة المرور
    const isMatch = bcrypt.compare(password, thisOwner.password);
    if (!isMatch) {
      return res.status(400).json({ msj: "incorrect password" });
    }

    // 3️⃣ إنشاء التوكن
    const token = jwt.sign(
      { id: thisOwner._id, name: thisOwner.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 4️⃣ حذف كلمة المرور من الكائن قبل الإرسال
    const ownerObj = thisOwner.toObject();
    delete ownerObj.password;

    // 5️⃣ الإرسال
    res.status(200).json({ token, owner: ownerObj });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// جلب بيانات المالك 
const infOwner =asyncHandler(async(req,res)=>{
  try {
    const thisOwner=await Owner.findById(req.params.id).select('password')
    if (!thisOwner) {
      return res.status(404).json({ msj: "owner not found" });
    }
    res.status(200).json(thisOwner)
  }catch(err){
    res.status(500).json({ message: err.message });
  }
})

// تعديل البيانات 
const updateInfoOwner = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const thisOwner = await Owner.findById(id).select('-password');

    if (!thisOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const { name, email, number, description } = req.body;

    if (name) thisOwner.name = name;
    if (email) thisOwner.email = email;
    if (number) thisOwner.number = number;
    if (description) thisOwner.description = description;

    if (req.file) {
      await deleteImage(thisOwner.profile_image);
      thisOwner.profile_image = req.file.path;
    }

    await thisOwner.save();

    res.status(200).json({
      msj: 'Update information success',
      owner: thisOwner,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//تعديل كلمة المرور 
const updatePassword=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.user
    const {oldPassword,newPassword}=req.body
    const thisOwner= await Owner.findById(id)
    isSame=bcrypt.compare(oldPassword, thisOwner.password);
    if (!isSame){
      return res.status(404).json({msj:'incorect password'})
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    thisOwner.password=hashedPassword
    await thisOwner.save()
    res.status(201).json({msj:'update password seccs'})
  }catch (err){
    res.status(500).json({ message: err.message });
  }
})

// حذف الحساب 

module.exports={
  createOwner,
  login,
  updateInfoOwner,
  updatePassword,
  infOwner
}
