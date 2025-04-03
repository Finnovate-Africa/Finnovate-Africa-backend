import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import compression from "compression";
import http from "http";
import path from "path";
import multer from 'multer';

import ConnectDB from "./src/config/db.config";
import AppError from "./src/errors/AppError";
import GlobalErrorHandler from "./src/errors/errorHandler";
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.routes";
import productRoutes from "./src/routes/product.routes";
import reviewRoutes from "./src/routes/reviews.routes";
import chatRoutes from "./src/routes/chat.routes";
import withdrawals from "./src/routes/withdrawal.routes";
import cartRoutes from "./src/routes/cart.routes";
import paymentRoutes from "./src/routes/payment.routes";
import orderRoutes from "./src/routes/order.routes";
import wishlistRoutes from "./src/routes/wishlist.routes";
import escrowRoutes from "./src/routes/escrow.routes";
import vendorsRoutes from "./src/routes/vendor.routes";
import logisticsRoutes from "./src/routes/logistics.routes";
import specsRoutes from "./src/routes/spec.routes";
import categoryRoutes from "./src/routes/category.routes";
import advertisementRoutes from "./src/routes/advertisement.routes";
import subscriptionRoutes from "./src/routes/subscription.routes";
import bannerRoutes from "./src/routes/banner.routes";
import flashSaleRoutes from "./src/routes/flashsale.routes";

import Limiter from "./src/middleware/rateLimit";
import logger, { logRequest } from "./src/middleware/logger";
import { COOKIE_SECRET, PORT } from "./src/serviceUrl";
import passport from "passport";

dotenv.config();
const port = PORT || 8080;

const app = express();
process.on("uncaughtException", (err: Error) => {
  logger.error("Unhandled Exception, shutting down...");
  logger.error(`${err.name}: ${err.message}`);
  process.exit(1);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(multer().any());


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(cookieParser(COOKIE_SECRET));
app.use(helmet({
  contentSecurityPolicy: false,
}));

//set view engine
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

//This code is converting our req.body to a string which is actually false.
// app.use(sanitizeInputs);
app.use(mongoSanitize());
app.use(logRequest);
app.use(passport.initialize());
const shouldCompress = (req: express.Request, res: express.Response) => {
  if (req.headers["x-no-compression"]) {
    // Don't compress responses if this request header is present
    return false;
  }
  return compression.filter(req, res);
};

app.use(compression({ filter: shouldCompress }));

//All Routes comes in Here
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/user", userRoutes);
app.use("/v1/api/product", Limiter, productRoutes);
app.use("/v1/api/review", Limiter, reviewRoutes);
app.use("/v1/api/cart", cartRoutes);
app.use("/v1/api/payment", paymentRoutes);
app.use("/v1/api/order", orderRoutes);
app.use("/v1/api/chat", chatRoutes);
app.use("/v1/api/wishlist", wishlistRoutes);
app.use("/v1/api/escrow", escrowRoutes);

app.use("/v1/api/payment", paymentRoutes);
app.use("/v1/api/order", orderRoutes);
app.use("/v1/api/chat", chatRoutes);
app.use("/v1/api/withdrawal", withdrawals);

app.use("/v1/api/vendor", vendorsRoutes)
app.use("/v1/api/logistics", logisticsRoutes)
app.use("/v1/api/category", categoryRoutes)
app.use("/v1/api/spec", specsRoutes)
app.use("/v1/api/ads", advertisementRoutes)
app.use("/v1/api/subscription", subscriptionRoutes)
app.use("/v1/api/banner", bannerRoutes);
app.use("/v1/api/flashsale", flashSaleRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const errorMessage = `Can not find ${req.originalUrl} with ${req.method} on this server`;
  logger.warn(errorMessage);
  next(new AppError(errorMessage, 501));
});

app.use(GlobalErrorHandler);
const server = ConnectDB().then(() => {
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });

  return httpServer;
});

process.on("unhandledRejection", (err: Error) => {
  logger.error("Unhandled Rejection, shutting down server...");
  logger.error(`${err.name}: ${err.message}`);
  server.catch(() => {
    process.exit(1);
  });
});

// Optional: Handle SIGTERM for graceful shutdown
process.on("SIGTERM", () => {
  server.then((httpServer) => {
    logger.info("SIGTERM received. Shutting down gracefully...");
    httpServer.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  });
});
