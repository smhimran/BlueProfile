import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

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
mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PASS +
    "@cluster1.todf2.mongodb.net/blue_division?retryWrites=true&w=majority"
);

// Using Routes
app.use("/api/problems", problemRoutes);
app.use("/api/user", userRoutes);
app.use("/api/standings", standingsRoutes);

app.get("/", (req, res, next) => {
  res.json({ message: "Hello World!" });
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
