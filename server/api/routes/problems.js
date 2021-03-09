import express from "express";
import mongoose from "mongoose";
import isAuthenticated from "../middleware/isAuthenticated";

// importing models
import Problem from "../models/problem";

const router = express.Router();

router.get("/", (req, res, next) => {
  Problem.find()
    .select("judge problemID")
    .exec()
    .then((docs) => res.status(200).json(docs))
    .catch((error) => res.status(404).json(error));
});

router.post("/", isAuthenticated, (req, res, next) => {
  const problem = new Problem({
    _id: new mongoose.Types.ObjectId(),
    judge: req.body.judge,
    problemID: req.body.problemID,
  });

  problem
    .save()
    .then((result) => {
      console.log("Crated problem!");
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
});

export default router;
