import express from "express";
import authRouter from "../router/auth.routes.js";
import cookieParser from "cookie-parser";
import config from "../config/env.config.js";
import cors from "cors";




const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀",
  });
});


app.use("/api/auth", authRouter);



export default app;
