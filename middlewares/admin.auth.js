import jwt from "jsonwebtoken";
export const isAdmin = (req, res, next) => {
  // Check if user exists and has admin role
  if (req.user && req.user?.role === "admin") {
    console.log(req.user, "isAdmin");
    return next(); // Allow access
  }
  res.status(403).json({ success: false, message: "Admin access denied" });
};

export const adminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Please log in.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID AND role to the request
    req.user = {
      id: decoded.id,
      role: decoded.role || "user", // Default to "user" if role doesn't exist
    };
    console.log(req.user, "req.user");
    next(); // Proceed to the next middleware/route
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};
