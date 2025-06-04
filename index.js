import expres from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticateRoute } from "./routes/authenticateRoute.js";
import { connectDB } from "./config/mongo.db.js";
import { userRoutes } from "./routes/authRoute.js";
import { postRoute } from "./routes/postRoute.js";

connectDB();
const app = expres();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(expres.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("", (req, res) => {
  res.send("api Workings");
});

// app.post("/api/posts", (req, res) => {
//   console.log(req.body);
//   res.json({ success: true });
// });

app.use("/api/user", authenticateRoute);
app.use("/api/user", userRoutes);
app.use("/api", postRoute);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
