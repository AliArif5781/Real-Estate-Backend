import rateLimit from "express-rate-limit";

export const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // Limit each user to 1 post per windowMs
  message: {
    success: false,
    message: "You can only create one property post every 15 minutes",
  },
  keyGenerator: (req) => {
    // Assuming you have user authentication
    // console.log(req.userId, "req");
    return req.userId.toString(); // Convert to string if using Mongoose
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
});
