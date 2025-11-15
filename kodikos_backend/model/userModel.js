const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  description: String,
  phone_number:String,
  password:String,
  profile_image:String
}, { timestamps: true });

module.exports= mongoose.model("User", ownerSchema);
