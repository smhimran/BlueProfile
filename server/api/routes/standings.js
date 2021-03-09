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
  let users = [];
  let problems = [];
  try {
    users = await User.find();
    problems = await Problem.find();

    let standings = [];

    for (let i = 0; i < users.length; i++) {
      try {
        let url = "https://vjudge.net/user/solveDetail/" + users[i].vjudgeID;
        const response = await axios.get(url);
        let solutions = response.data.acRecords;
        let solveCount = 0;
        problems.forEach((problem) => {
          let judge = problem.judge;
          if (solutions[judge].includes(problem.problemID)) {
            //   console.log(judge + " " + problem.problemID);
            // let solvedProblem = judge + " " + problem.problemID;
            solveCount++;
          }
        });
        const person = {
          name: users[i].name,
          vjudgeID: users[i].vjudgeID,
          solved: solveCount,
        };
        standings.push(person);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    }

    standings.sort((a, b) => b.solved - a.solved);

    res.status(200).json({ standings: standings });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get specific user submissions
router.get("/:vjudgeID", (req, res, next) => {
  const vjudgeID = req.params.vjudgeID;

  Problem.find()
    .exec()
    .then((problems) => {
      let submissions = [];

      let url = "https://vjudge.net/user/solveDetail/" + vjudgeID;

      axios
        .get(url)
        .then((response) => {
          let solutions = response.data.acRecords;

          problems.forEach((problem) => {
            let judge = problem.judge;
            if (solutions[judge].includes(problem.problemID)) {
              submissions.push(problem);
            }
          });

          res.status(200).json({
            submissions,
          });
        })
        .catch((error) => res.status(500).json({ message: error }));
    })
    .catch((error) => res.status(500).json({ message: error }));
});

export default router;
