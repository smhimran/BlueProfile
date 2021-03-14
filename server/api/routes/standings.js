import express from "express";
import mongoose from "mongoose";
import axios from "axios";

// Importing the models
import User from "../models/user";
import Problem from "../models/problem";
import user from "../models/user";

// Define the router
const router = express.Router();

// Get full standings
router.get("/", async (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      users.sort((a, b) => b.solves.length - a.solves.length);
      let standings = [];
      for (let i = 0; i < users.length; i++) {
        console.log(users[i].name);
        standings.push({
          name: users[i].name,
          vjudgeID: users[i].vjudgeID,
          solveCount: users[i].solves.length,
        });
      }
      res.status(200).json({ standings: standings });
    })
    .catch((error) => res.status(500).json(error));
});

// Get specific user submissions
router.get("/:vjudgeID", (req, res, next) => {
  const vjudgeID = req.params.vjudgeID;

  User.findOne({ vjudgeID: vjudgeID })
    .select("name vjudgeID solves")
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => res.status(404).json(error));
});

export default router;
