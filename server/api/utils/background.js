import cron from "node-cron";
import mongoose from "mongoose";
import axios from "axios";

// Connect to the Database
mongoose.connect("mongodb://localhost/blue_division", {
  useNewUrlParser: true,
});

// Models
import User from "../models/user";
import Problem from "../models/problem";

let task = cron.schedule("* * * * *", async function () {
  console.log("\n***Updating db started***\n");
  let users = [];
  let problems = [];
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }

  try {
    problems = await Problem.find();
  } catch (error) {
    console.log(error);
  }

  for (let i = 0; i < users.length; i++) {
    let submissions = [];
    try {
      console.log(`updating profile of ${users[i].vjudgeID}`);
      let url = "https://vjudge.net/user/solveDetail/" + users[i].vjudgeID;
      const response = await axios.get(url);
      let solutions = response.data.acRecords;
      problems.forEach((problem) => {
        let judge = problem.judge;
        if (solutions[judge]) {
          if (solutions[judge].includes(problem.problemID)) {
            submissions.push({
              judge: problem.judge,
              problemID: problem.problemID,
              title: problem.title,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    users[i].solves = submissions;
    users[i].save();
  }
  console.log("\n***Updating db finished***\n");
});

task.start();
