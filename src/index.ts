import dotenv from "dotenv";
dotenv.config();
import { ENV } from "./env";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

import { globalErrorHandler } from "./middlewares/error";

import challengeRouter from "./routes/challenges";
import leaderboardRouter from "./routes/leaderboard";
import userRouter from "./routes/users";
import socialRouter from "./routes/social";
import shopRouter from "./routes/shop";

const app = express();

const allowedOrigins: string[] = [
  /* Dev */
  "http://localhost:5173",

  /* Prod */
  // "https://skillforge.com",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Request limit per windowMs
  message: "Too many requests from this IP",
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

app.all("/api/auth/*path", toNodeHandler(auth));
app.use("/api/challenges", challengeRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/users", userRouter);
app.use("/api/social", socialRouter);
app.use("/api/shop", shopRouter);

app.use(globalErrorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server started on port ${ENV.PORT}`);
});
