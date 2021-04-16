import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import path from "path";

// Importing Routers
import problemRoutes from "./api/routes/problems";
import userRoutes from "./api/routes/user";
import standingsRoutes from "./api/routes/standings";

const app = express();

// Using Morgan to log reqests to console
app.use(morgan("dev"));

// Required middleware to parse body and json, allow cors
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Connecting to the database using mongoose
mongoose.connect("mongodb://localhost/blue_division");

// Serving Static files
app.use(express.static(path.join(__dirname, "../client/build")));

// Using Routes
app.use("/api/problems", problemRoutes);
app.use("/api/user", userRoutes);
app.use("/api/standings", standingsRoutes);

// Handling any request that doesn't match the above
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

export default app;
