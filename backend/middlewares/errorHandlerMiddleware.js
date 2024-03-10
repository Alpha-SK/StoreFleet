import mongoose from "mongoose";
import { ErrorHandler } from "../utils/errorHandler.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ success: false, error: errors });
  }

  // Handle MongoDB duplicate key errors
  if (err.message && err.message.includes("duplicate key error")) {
    return res.status(400).json({ success: false, error: "Email already registered" });
  }

  // For other types of errors, use the existing error handling logic
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ success: false, error: err.message });
};

// Handling uncaughtException
export const handleUncaughtError = () => {
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down server due to uncaughtException");
    process.exit(1);
  });
};
