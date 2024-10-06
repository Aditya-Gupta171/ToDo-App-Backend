import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieparser from "cookie-parser";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

//using middlewares
app.use(express.json()); //using middleware aur express.json hmesha pehle access kre wrna routing m dikat hota h
app.use(cookieparser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // This is important if you're using cookies
  })
);

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

//by using error middleware
app.use(errormiddleware);
