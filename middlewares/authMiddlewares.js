import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Admin access middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ success: false, message: "Error in admin middleware" });
  }
};
