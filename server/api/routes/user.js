import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isAuthenticated from "../middleware/isAuthenticated";

// importing models
import User from "../models/user";

// Define the router
const router = express.Router();

// User Login Route
router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({ message: "Authentication failed!" });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({ message: "Authentication failed!" });
          } else {
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                  vjudgeID: user[0].vjudgeID,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h",
                }
              );
              res.status(200).json({
                message: "Auth Successful!",
                token: token,
              });
            } else {
              res.status(401).json({ message: "Authentication failed!" });
            }
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// User Signup Route
router.post("/signup", (req, res, next) => {
  User.find({
    $or: [{ email: req.body.email }, { vjudgeID: req.body.vjudgeID }],
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "An user with the Email or VjudgeID already exists!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            let vjudgeID = req.body.vjudgeID;
            vjudgeID = vjudgeID.toLowerCase();
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              vjudgeID: vjudgeID,
              password: hash,
            });

            user
              .save()
              .then((result) =>
                res.status(201).json({
                  _id: result.id,
                  name: result.name,
                  email: result.email,
                  vjudgeID: result.vjudgeID,
                })
              )
              .catch((error) => res.status(500).json({ error: error }));
          }
        });
      }
    });
});

// Getting User info
router.get("/:vjudgeID", (req, res, next) => {
  let vjudgeID = req.params.vjudgeID;

  vjudgeID = vjudgeID.toLowerCase();

  User.find({ vjudgeID: vjudgeID })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(404).json({
          message: "No such user found!",
        });
      } else {
        res.status(200).json({
          id: user[0]._id,
          name: user[0].name,
          email: user[0].email,
          vjudgeID: user[0].vjudgeID,
        });
      }
    })
    .catch((error) => res.status(500).send(error));
});

// Update a User
router.patch("/:vjudgeID", isAuthenticated, (req, res, next) => {
  const vjudgeID = req.params.vjudgeID;
  if (vjudgeID != req.userData.vjudgeID) {
    res.status(401).json({
      message: "You do not have permission to update this user!",
    });
  } else {
    const updateOps = {};

    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }

    User.updateOne({ vjudgeID: vjudgeID }, { $set: updateOps })
      .exec()
      .then((result) =>
        res.status(200).json({
          message: "User updated successfully!",
        })
      )
      .catch((error) => res.status(500).json({ message: error }));
  }
});

export default router;