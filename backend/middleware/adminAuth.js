import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    // Check if the authorization header is present
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to access this page.",
      });
    }

    // Attach the user to the request object for use in route handlers
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token.",
      error: error.message,
    });
  }
};

export default adminAuth;
