import path from "path";
import express, { json } from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";
import "./services/passport";
import { fileFilter, fileStorage } from "./services/file";

// Import Routes
import { AuthRoute } from "./routes/auth";
import { MessageRoute } from "./routes/message";
import { RoomRoute } from "./routes/room";

const app = express();

// Env
config();

app.use(json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1!, process.env.COOKIE_KEY_2!],
  })
);

// File uploads
app.use(multer({ storage: fileStorage }).single("file"));

app.use(passport.initialize());
app.use(passport.session());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Files folder
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "../", "public", "uploads"))
);

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);
app.use("/api/room", RoomRoute);
app.all("*", (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export { app };
