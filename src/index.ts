import dotenv from "dotenv";
dotenv.config();
import { ENV } from "./env";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

import { prisma } from "./lib/db";
import { globalErrorHandler } from "./middlewares/error";

import challengeRouter from "./routes/challenges";
import leaderboardRouter from "./routes/leaderboard";
import userRouter from "./routes/users";
import socialRouter from "./routes/social";
import shopRouter from "./routes/shop";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins: string[] = [
  /* Dev */
  "http://localhost:5173",

  /* Prod */
  "https://skill-forge-back.onrender.com",
  "https://skill-forge-pi-ten.vercel.app",
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

app.get("/ping", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send("pong & DB active");
  } catch (error) {
    console.error("Erreur Ping DB:", error);
    res.status(200).send("pong & (DB error)");
  }
});

app.use(globalErrorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server started on port ${ENV.PORT}`);
});
