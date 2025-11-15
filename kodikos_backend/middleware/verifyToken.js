const jwt = require("jsonwebtoken");
const Owner = require("../model/userModel");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    // Check if the owner exists in the database
    const thisOwner = await Owner.findById(req.user.id);
    if (!thisOwner) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user to the request
    req.user = thisOwner;

    // Move to the next middleware or route
    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
