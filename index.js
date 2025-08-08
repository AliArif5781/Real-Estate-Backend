import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticateRoute } from "./routes/authenticateRoute.js";
import { connectDB } from "./config/mongo.db.js";
import { userRoutes } from "./routes/authRoute.js";
import { postRoute } from "./routes/postRoute.js";
import { isAdmin } from "./middlewares/admin.auth.js";
import { adminRoute } from "./routes/adminRoute.js";
import { soldPropertyRoute } from "./routes/soldPropertyRoute.js";

connectDB();
const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://real-estate-frontend-omega-mocha.vercel.app",
    ],
    credentials: true,
  })
);

app.get("", (req, res) => {
  res.send("api Workings");
});

app.use("/api/user", authenticateRoute);
app.use("/api/user", userRoutes);
app.use("/api", postRoute);
app.use("/api/admin", adminRoute);
app.use("/api/properties", soldPropertyRoute);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
