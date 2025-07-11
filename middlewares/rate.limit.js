import rateLimit from "express-rate-limit";

export const postLimiter = rateLimit({
  windowMs: 30 * 1000, // 1 minute (60 seconds)
  max: 1, // Limit each user to 1 post per windowMs
  message: {
    success: false,
    message: "You can only create one property post every minute",
  },
  keyGenerator: (req) => req.userId.toString(),
  standardHeaders: true,
  legacyHeaders: false,
});
