import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import chatRoute from "./routes/chatRoute.js";
dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello Soket io<h1/>");
});

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
