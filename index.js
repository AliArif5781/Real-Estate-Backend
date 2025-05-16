import expres from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticateRoute } from "./routes/authenticateRoute.js";
import { connectDB } from "./config/mongo.db.js";

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

app.use("/api/user", authenticateRoute);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
